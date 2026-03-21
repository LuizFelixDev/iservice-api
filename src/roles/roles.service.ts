import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleName } from './enums/role.enum';

@Injectable()
export class RolesService implements OnApplicationBootstrap {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async onApplicationBootstrap() {
    const perfisBase = [
      { name: RoleName.USER, description: 'Utilizador comum (Cliente)' },
      { name: RoleName.ADMIN, description: 'Administrador do sistema' },
      {
        name: RoleName.PROFESSIONAL,
        description: 'Profissional prestador de serviços',
      },
    ];

    for (const perfil of perfisBase) {
      const roleExiste = await this.roleRepository.findOne({
        where: { name: perfil.name },
      });

      if (!roleExiste) {
        const novaRole = this.roleRepository.create(perfil);
        await this.roleRepository.save(novaRole);
        this.logger.log(`Seeder: Role '${perfil.name}' inserida com sucesso.`);
      }
    }
  }

  async findByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }
}
