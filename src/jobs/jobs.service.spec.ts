import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { UsersService } from 'src/users/users.service';
import { CreateJobDto } from './dto/create-job.dto';

describe('JobsService', () => {
  let service: JobsService;

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest
      .fn()
      .mockResolvedValue([{ id: 1, description: 'Serviço Radar' }]),
  };

  const mockJobRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  };

  const mockUsersService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getRepositoryToken(Job),
          useValue: mockJobRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Inicialização', () => {
    it('deve estar definido', () => {
      expect(service).toBeDefined();
    });
  });

  describe('create', () => {
    it('deve formatar as coordenadas em GeoJSON Point e salvar o serviço', async () => {
      const createJobDto: CreateJobDto = {
        description: 'Vazamento na pia',
        latitude: -6.4585,
        longitude: -37.0944,
      };

      const mockUser = { id: 1, name: 'João Cliente' };
      const mockJobCreated = {
        description: createJobDto.description,
        client: mockUser,
      };

      mockUsersService.findById.mockResolvedValue(mockUser);
      mockJobRepository.create.mockReturnValue(mockJobCreated);
      mockJobRepository.save.mockResolvedValue({ id: 10, ...mockJobCreated });

      const result = await service.create(createJobDto, 1);

      expect(mockUsersService.findById).toHaveBeenCalledWith(1);
      expect(mockJobRepository.create).toHaveBeenCalledWith({
        description: 'Vazamento na pia',
        location: {
          type: 'Point',
          coordinates: [-37.0944, -6.4585],
        },
        client: mockUser,
      });
      expect(mockJobRepository.save).toHaveBeenCalledWith(mockJobCreated);
      expect(result).toHaveProperty('id', 10);
    });
  });

  describe('findByClient', () => {
    it('deve retornar os serviços solicitados por um cliente específico', async () => {
      const mockJobs = [{ id: 1, description: 'Limpeza de calha' }];
      mockJobRepository.find.mockResolvedValue(mockJobs);

      const result = await service.findByClient(1);

      expect(mockJobRepository.find).toHaveBeenCalledWith({
        where: { client: { id: 1 } },
        relations: ['client', 'professional'],
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(mockJobs);
    });
  });

  describe('findNearbyJobs', () => {
    it('deve usar o raio padrão de 10000 metros quando nenhum raio é fornecido', async () => {
      const result = await service.findNearbyJobs(-6.4585, -37.0944);

      expect(mockJobRepository.createQueryBuilder).toHaveBeenCalledWith('job');
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          latitude: -6.4585,
          longitude: -37.0944,
          radius: 10000,
        }),
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'job.createdAt',
        'DESC',
      );
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual([{ id: 1, description: 'Serviço Radar' }]);
    });

    it('deve converter e usar o raio fornecido (ex: 5000 metros)', async () => {
      await service.findNearbyJobs(-6.4585, -37.0944, '5000');

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          radius: 5000,
        }),
      );
    });
  });
});
