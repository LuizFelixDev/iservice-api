import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private userRepository: UsersService,
  ) {}

  async create(createJobDto: CreateJobDto, userId: number) {
    const user = await this.userRepository.findById(userId);

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
