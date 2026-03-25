import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createJobDto: CreateJobDto, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const job = this.jobRepository.create({
      description: createJobDto.description,

      location: {
        type: 'Point',
        coordinates: [createJobDto.longitude, createJobDto.latitude],
      },

      client: user,
    });

    return this.jobRepository.save(job);
  }

  async findByClient(userId: number) {
    return this.jobRepository.find({
      where: {
        client: {
          id: userId,
        },
      },
      relations: ['client', 'professional'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
