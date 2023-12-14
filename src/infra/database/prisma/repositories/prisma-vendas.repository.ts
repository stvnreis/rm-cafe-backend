import { Injectable } from '@nestjs/common';
import {
  VendasRepository,
  fetchVendasWithRelationResponse,
  findByIdDomainResponse,
} from 'src/domain/cafeteria/application/repositories/vendas.repository';
import { PrismaService } from '../prisma.service';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Venda } from 'src/domain/cafeteria/enterprise/entities/venda';
import { PrismaVendaMapper } from '../mappers/prisma-venda.mapper';
import { removeDuplicates } from 'src/core/helpers/remove-duplicates';
import { PrismaItensVendaMapper } from '../mappers/prisma-itens-venda.mapper';
import { PrismaProdutoMapper } from '../mappers/prisma-produto.mapper';
import { PrismaFuncionarioMapper } from '../mappers/prisma-funcionario.mapper';
import { ItemVenda } from 'src/domain/cafeteria/enterprise/entities/item-venda';

@Injectable()
export class PrismaVendasRepository implements VendasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    vendaEntity: Venda,
    itensVendaEntity: ItemVenda[],
  ): Promise<Venda> {
    return await this.prisma.$transaction(async (tx) => {
      const vendaData = PrismaVendaMapper.toPrisma(vendaEntity);

      const venda = await tx.vendas.create({ data: vendaData });

      const itens = itensVendaEntity.map((item) => {
        return ItemVenda.create({
          quantidade: item.quantidade,
          valor: item.valor,
          idProduto: item.idProduto,
          idVenda: UniqueEntityId.createFromRaw(venda.id),
        });
      });

      const itensData = itens.map(PrismaItensVendaMapper.toPrisma);

      await tx.itens.createMany({ data: itensData });

      itens.forEach(async (item) => {
        await tx.produtos.update({
          data: { quantidade: { decrement: item.quantidade } },
          where: { id: item.idProduto.toNumber() },
        });
      });

      return PrismaVendaMapper.toDomain(venda);
    });
  }

  async fetch(): Promise<fetchVendasWithRelationResponse> {
    const vendas = await this.prisma.vendas.findMany({
      include: { funcionarios: true },
    });

    return {
      vendas: vendas.map((venda) => {
        return {
          venda: PrismaVendaMapper.toDomain(venda),
          funcionario: PrismaFuncionarioMapper.toDomain(venda.funcionarios),
        };
      }),
    };
  }

  async findById(id: number): Promise<findByIdDomainResponse> {
    const venda = await this.prisma.vendas.findFirst({ where: { id } });

    const funcionario = await this.prisma.funcionarios.findFirst({
      where: { id: venda.id_funcionario },
    });

    const itensVenda = await this.prisma.itens.findMany({
      where: { id_venda: venda.id },
    });

    const idProdutos = itensVenda.map((item) => Number(item.id_produto));

    const produtos = await this.prisma.produtos.findMany({
      where: { id: { in: removeDuplicates(idProdutos) } },
    });

    return {
      venda: PrismaVendaMapper.toDomain(venda),
      items: itensVenda.map(PrismaItensVendaMapper.toDomain),
      produtos: produtos.map(PrismaProdutoMapper.toDomain),
      funcionario: PrismaFuncionarioMapper.toDomain(funcionario),
    };
  }
}
