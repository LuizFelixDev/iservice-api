import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() createFeedbackDto: CreateFeedbackDto) {
    const userId = req.user.id;
    return await this.feedbacksService.create(userId, createFeedbackDto);
  }
}
