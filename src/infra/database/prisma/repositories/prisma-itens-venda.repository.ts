import { Injectable } from '@nestjs/common';
import { ItensVendaRepository } from 'src/domain/cafeteria/application/repositories/itens-venda.repository';
import { ItemVenda } from 'src/domain/cafeteria/enterprise/entities/item-venda';
import { PrismaService } from '../prisma.service';
import { PrismaItensVendaMapper } from '../mappers/prisma-itens-venda.mapper';

@Injectable()
export class PrismaItensVendaRepository implements ItensVendaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: ItemVenda): Promise<void> {
    const data = PrismaItensVendaMapper.toPrisma(entity);

    await this.prisma.itens.create({ data });
  }
}
