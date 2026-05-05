import { Injectable, NotFoundException } from '@nestjs/common';
import { Worker } from './entities/worker.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkersService {
  private workers: Worker[] = [];
  private id = 1;

  create(data: CreateWorkerDto): Worker {
    const worker: Worker = {
      id: this.id++,
      ...data,
    };

    this.workers.push(worker);
    return worker;
  }

  findAll(): Worker[] {
    return this.workers;
  }

  findOne(id: number): Worker {
    const worker = this.workers.find(w => w.id === id);

    if (!worker) {
      throw new NotFoundException('Worker não encontrado');
    }

    return worker;
  }

  update(id: number, data: UpdateWorkerDto): Worker {
    const worker = this.findOne(id);
    Object.assign(worker, data);
    return worker;
  }

  remove(id: number) {
    this.findOne(id);
    this.workers = this.workers.filter(w => w.id !== id);
    return { deleted: true };
  }
}