// src/workers/workers.service.spec.ts

import { WorkersService } from './workers.service';
import { NotFoundException } from '@nestjs/common';

describe('WorkersService', () => {
  let service: WorkersService;

  beforeEach(() => {
    service = new WorkersService();
  });

  it('deve criar um trabalhador', () => {
    const worker = service.create({
      name: 'João',
      role: 'Pedreiro',
    });

    expect(worker).toHaveProperty('id');
    expect(worker.name).toBe('João');
  });

  it('deve listar trabalhadores', () => {
    service.create({ name: 'João', role: 'Pedreiro' });
    service.create({ name: 'Maria', role: 'Pintora' });

    const workers = service.findAll();

    expect(workers.length).toBe(2);
  });

  it('deve buscar por id', () => {
    const worker = service.create({
      name: 'João',
      role: 'Pedreiro',
    });

    const found = service.findOne(worker.id);

    expect(found.id).toBe(worker.id);
  });

  it('deve lançar erro ao buscar inexistente', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('deve atualizar trabalhador', () => {
    const worker = service.create({
      name: 'João',
      role: 'Pedreiro',
    });

    const updated = service.update(worker.id, {
      name: 'Carlos',
    });

    expect(updated.name).toBe('Carlos');
  });

  it('deve remover trabalhador', () => {
    const worker = service.create({
      name: 'João',
      role: 'Pedreiro',
    });

    service.remove(worker.id);

    expect(service.findAll().length).toBe(0);
  });
});