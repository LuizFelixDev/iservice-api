import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto, @Req() req: AuthRequest) {
    return this.jobsService.create(createJobDto, req.user.id);
  }

  @Get('my-jobs')
  findMyJobs(@Req() req: AuthRequest) {
    return this.jobsService.findByClient(req.user.id);
  }
}