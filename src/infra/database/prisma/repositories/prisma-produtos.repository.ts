import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  ProdutosRepository,
  FetchProdutosResponse,
  FetchProdutosOptions,
} from 'src/domain/cafeteria/application/repositories/produtos.repository';
import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';
import { PrismaProdutoMapper } from '../mappers/prisma-produto.mapper';
import { PrismaProdutoCategoriaMapper } from '../mappers/prisma-produto-categoria.mapper';
import { PrismaFornecedoresMapper } from '../mappers/prisma-fornecedores.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaProdutosRepository implements ProdutosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Produto): Promise<Produto> {
    const data = PrismaProdutoMapper.toPrisma(entity);

    const produto = await this.prisma.produtos.create({ data });

    return PrismaProdutoMapper.toDomain(produto);
  }

  async fetch({
    ids,
    relations,
    dsCategoria,
  }: FetchProdutosOptions): Promise<FetchProdutosResponse> {
    let include: Prisma.produtosInclude;
    if (relations) {
      include = {
        fornecedores: true,
        produto_categoria: true,
      };
    }

    let where: Prisma.produtosWhereInput;
    if (dsCategoria) {
      where = {
        produto_categoria: {
          descricao: { contains: dsCategoria },
          id: { in: ids },
        },
      };
    }

    const produtos = await this.prisma.produtos.findMany({
      where,
      include,
    });

    if (!relations)
      return {
        produtos: produtos.map(PrismaProdutoMapper.toDomain),
      };

    return {
      produtos: produtos.map((row) => {
        return {
          produto: PrismaProdutoMapper.toDomain(row),
          produtoCategoria: PrismaProdutoCategoriaMapper.toDomain(
            row.produto_categoria,
          ),
          fornecedor: PrismaFornecedoresMapper.toDomain(row.fornecedores),
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
