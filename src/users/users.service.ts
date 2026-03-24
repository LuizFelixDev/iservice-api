import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, CreateLocalUser } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { DadosPerfilSocial } from './entities/user.entity';
import { RoleName } from '../roles/enums/role.enum';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  /**
   * Lógica para Login Social (Google/Facebook)
   */
  async buscarOuCriarSocial(perfil: DadosPerfilSocial): Promise<User> {
    let usuario = await this.userRepository.findOne({
      where: { email: perfil.email },
      relations: ['roles', 'profile'],
    });

    if (!usuario) {
      const rolePadrao = await this.rolesService.findByName(RoleName.USER);

      usuario = this.userRepository.create({
        email: perfil.email,
        firstName: perfil.firstName,
        lastName: perfil.lastName,
        picture: perfil.picture,
        provider: perfil.provider,
        roles: rolePadrao ? [rolePadrao] : [],
      });
      usuario = await this.userRepository.save(usuario);
    }

    return usuario;
  }

  /**
   * Registo de novo utilizador com E-mail e Password
   */
  async createLocalUser(dados: RegisterDto) {
    const usuarioExistente = await this.userRepository.findOne({
      where: { email: dados.email },
    });

    if (usuarioExistente) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dados.password, saltRounds);

    const rolePadrao = await this.rolesService.findByName(RoleName.USER);

    const novoUsuario = User.createLocal(
      dados as CreateLocalUser,
      hashedPassword,
      rolePadrao ? [rolePadrao] : [],
    );

    const usuarioSalvo = await this.userRepository.save(novoUsuario);

    return UserResponseDto.fromEntity(usuarioSalvo);
  }

  /**
   * Validação de credenciais para Login
   */
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'firstName', 'lastName'],
      relations: ['roles'],
    });

    if (user && user.password) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        delete (user as Partial<User>).password;
        return user;
      }
    }

    return null;
  }

  /**
   * Procura utilizador por ID com todas as relações
   */
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'profile'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  /**
   * Atualização de Perfil com Promoção Automática para Profissional
   */
  async updateProfile(userId: number, dto: UpdateProfileDto) {
    // 1. Carregar utilizador com as roles para validar permissões atuais
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile', 'roles'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    // Inicializa o objeto profile se não existir
    if (!user.profile) {
      user.profile = new Profile();
    }

    // 2. Atualizar Geolocalização (Critério de Aceite 1)
    if (dto.latitude !== undefined && dto.longitude !== undefined) {
      user.profile.location = {
        type: 'Point',
        coordinates: [dto.longitude, dto.latitude],
      };
    }

    // 3. Atualizar Bio e outros campos (Critério de Aceite 1)
    Object.assign(user.profile, dto);

    // --- LÓGICA DE UPGRADE AUTOMÁTICO ---

    // 4. Verificar se já é profissional (Corrigido para evitar o erro de Enum do ESLint)
    const jaEProfissional = user.roles.some(
      (role) => (role.name as unknown as RoleName) === RoleName.PROFESSIONAL,
    );

    // Requisitos mínimos: Bio preenchida e Localização definida
    const temBio = !!user.profile.bio;
    const temLocalizacao = !!user.profile.location;

    if (!jaEProfissional && temBio && temLocalizacao) {
      const roleProfissional = await this.rolesService.findByName(
        RoleName.PROFESSIONAL,
      );

      if (roleProfissional) {
        // 5. Adicionar a nova role SEM apagar a de USER
        user.roles.push(roleProfissional);
      }
    }

    // 6. Salvar todas as alterações
    await this.userRepository.save(user);

    // Retorna o DTO formatado (Critério de Aceite 2)
    return UserResponseDto.fromEntity(user);
  }

  /**
   * Retorna os dados do utilizador logado
   */
  async findMe(id: number): Promise<UserResponseDto> {
    const user = await this.findById(id);
    return UserResponseDto.fromEntity(user);
  }
}
