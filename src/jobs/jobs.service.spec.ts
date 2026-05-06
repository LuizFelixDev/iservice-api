import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { UsersService } from 'src/users/users.service';

describe('JobsService', () => {
  let service: JobsService;
  let jobRepositoryMock: any;
  let usersServiceMock: any;

  beforeEach(async () => {
    jobRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    usersServiceMock = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getRepositoryToken(Job),
          useValue: jobRepositoryMock,
        },
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo job com sucesso usando UUID #37', async () => {
      const mockDto = { description: 'Teste', longitude: 0, latitude: 0 };
      const mockUserId = 'uuid-v4-string';
      const mockUser = { id: mockUserId, name: 'Mestre Ismael' };

      usersServiceMock.findById.mockResolvedValue(mockUser);
      jobRepositoryMock.create.mockReturnValue({ ...mockDto, client: mockUser });
      jobRepositoryMock.save.mockResolvedValue({ id: 'job-id', ...mockDto });

      const result = await service.create(mockDto as any, mockUserId);

      expect(usersServiceMock.findById).toHaveBeenCalledWith(mockUserId);
      expect(result).toHaveProperty('id');
    });
  });

  describe('findByClient', () => {
    it('deve retornar lista de jobs de um cliente usando UUID #37', async () => {
      const mockUserId = 'uuid-v4-string';
      jobRepositoryMock.find.mockResolvedValue([{ id: 'job-1' }, { id: 'job-2' }]);

      const result = await service.findByClient(mockUserId);

      expect(jobRepositoryMock.find).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});