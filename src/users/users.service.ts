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

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'profile'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile', 'roles'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (!user.profile) {
      user.profile = new Profile();
    }

    if (dto.latitude !== undefined && dto.longitude !== undefined) {
      user.profile.location = {
        type: 'Point',
        coordinates: [dto.longitude, dto.latitude],
      };
    }

    Object.assign(user.profile, dto);

    const jaEProfissional = user.roles.some(
      (role) => (role.name as unknown as RoleName) === RoleName.PROFESSIONAL,
    );

    const temBio = !!user.profile.bio;
    const temLocalizacao = !!user.profile.location;

    if (!jaEProfissional && temBio && temLocalizacao) {
      const roleProfissional = await this.rolesService.findByName(
        RoleName.PROFESSIONAL,
      );

      if (roleProfissional) {
        user.roles.push(roleProfissional);
      }
    }

    await this.userRepository.save(user);

    return UserResponseDto.fromEntity(user);
  }

  async findMe(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'profile'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return UserResponseDto.fromEntity(user);
  }
}
