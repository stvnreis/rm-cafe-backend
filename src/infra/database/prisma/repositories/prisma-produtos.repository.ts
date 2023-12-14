import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  FetchWithRelationsOptions,
  FetchWithRelationsResponse,
  ProdutosRepository,
} from 'src/domain/cafeteria/application/repositories/produtos.repository';
import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';
import { PrismaProdutoMapper } from '../mappers/prisma-produto.mapper';
import { PrismaProdutoCategoriaMapper } from '../mappers/prisma-produto-categoria.mapper';
import { PrismaFornecedoresMapper } from '../mappers/prisma-fornecedores.mapper';

@Injectable()
export class PrismaProdutosRepository implements ProdutosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Produto): Promise<Produto> {
    const data = PrismaProdutoMapper.toPrisma(entity);

    const produto = await this.prisma.produtos.create({ data });

    return PrismaProdutoMapper.toDomain(produto);
  }

  async fetch(): Promise<Produto[]> {
    const produtos = await this.prisma.produtos.findMany();

    return produtos.map(PrismaProdutoMapper.toDomain);
  }

  async fetchWithRelations({
    dsCategoria,
  }: FetchWithRelationsOptions): Promise<FetchWithRelationsResponse> {
    const produtos = await this.prisma.produtos.findMany({
      include: { produto_categoria: true, fornecedores: true },
      where: { produto_categoria: { descricao: dsCategoria } },
    });

    return {
      produtos: produtos.map((produto) => {
        return {
          produto: PrismaProdutoMapper.toDomain(produto),
          fornecedor: PrismaFornecedoresMapper.toDomain(produto.fornecedores),
          produtoCategoria: PrismaProdutoCategoriaMapper.toDomain(
            produto.produto_categoria,
          ),
        };
      }),
    };
  }

  async findByid(id: number): Promise<Produto> {
    const produto = await this.prisma.produtos.findFirst({ where: { id } });
    if (!produto) return null;

    return PrismaProdutoMapper.toDomain(produto);
  }

  async save(entity: Produto): Promise<void> {
    const data = PrismaProdutoMapper.toPrismaUpdate(entity);

    await this.prisma.produtos.update({ where: { id: entity.id.value }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.produtos.delete({ where: { id } });
  }
}
