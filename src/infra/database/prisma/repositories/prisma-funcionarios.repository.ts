import { Injectable } from '@nestjs/common';
import { FuncionariosRepository } from 'src/domain/cafeteria/application/repositories/funcionarios.repository';
import { PrismaService } from '../prisma.service';
import { FetchOptions } from 'src/core/repositories/fetch-options';
import { Funcionario } from 'src/domain/cafeteria/enterprise/entities/funcionario';
import { PrismaFuncionarioMapper } from '../mappers/prisma-funcionario.mapper';

@Injectable()
export class PrismaFuncionariosRepository implements FuncionariosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async fetch(options?: FetchOptions): Promise<Funcionario[]> {
    const funcionarios = await this.prisma.funcionarios.findMany({
      where: { id: { in: options.ids } },
    });

    return funcionarios.map(PrismaFuncionarioMapper.toDomain);
  }
}
