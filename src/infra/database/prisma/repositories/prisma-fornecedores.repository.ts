import { FornecedoresRepository } from 'src/domain/cafeteria/application/repositories/vendedores.repository';
import { Fornecedor } from 'src/domain/cafeteria/enterprise/entities/fornecedor';
import { PrismaService } from '../prisma.service';
import { PrismaFornecedoresMapper } from '../mappers/prisma-fornecedores.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaFornecedoresRepository implements FornecedoresRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Fornecedor): Promise<Fornecedor> {
    const data = PrismaFornecedoresMapper.toPrisma(entity);

    const fornecedor = await this.prisma.fornecedores.create({ data });

    return PrismaFornecedoresMapper.toDomain(fornecedor);
  }

  async fetch(): Promise<Fornecedor[]> {
    const fornecedores = await this.prisma.fornecedores.findMany();

    return fornecedores.map(PrismaFornecedoresMapper.toDomain);
  }

  async findById(id: number | bigint): Promise<Fornecedor> {
    const fornecedor = await this.prisma.fornecedores.findFirst({
      where: { id },
    });
    if (!fornecedor) return null;

    return PrismaFornecedoresMapper.toDomain(fornecedor);
  }
}
