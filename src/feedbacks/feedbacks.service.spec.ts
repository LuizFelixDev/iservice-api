import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksService } from './feedbacks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { User } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('FeedbacksService', () => {
  let service: FeedbacksService;

  const mockFeedbackRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbacksService,
        {
          provide: getRepositoryToken(Feedback),
          useValue: mockFeedbackRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<FeedbacksService>(FeedbacksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a feedback successfully', async () => {
      const createFeedbackDto = { text: 'Test feedback' };
      const user = { id: 'user-id' } as User;
      const feedback = { id: 'feedback-id', text: 'Test feedback', user } as Feedback;

      mockUserRepository.findOne.mockResolvedValue(user);
      mockFeedbackRepository.create.mockReturnValue(feedback);
      mockFeedbackRepository.save.mockResolvedValue(feedback);

      const result = await service.create('user-id', createFeedbackDto);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 'user-id' } });
      expect(mockFeedbackRepository.create).toHaveBeenCalledWith({
        text: 'Test feedback',
        user,
      });
      expect(mockFeedbackRepository.save).toHaveBeenCalledWith(feedback);
      expect(result).toEqual(feedback);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createFeedbackDto = { text: 'Test feedback' };

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.create('user-id', createFeedbackDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 'user-id' } });
      expect(mockFeedbackRepository.create).not.toHaveBeenCalled();
      expect(mockFeedbackRepository.save).not.toHaveBeenCalled();
    });
  });
});
