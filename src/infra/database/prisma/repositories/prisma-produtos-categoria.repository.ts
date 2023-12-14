import { Injectable } from '@nestjs/common';
import { ProdutosCategoriaRepository } from 'src/domain/cafeteria/application/repositories/categorias.repository';
import { ProdutoCategoria } from 'src/domain/cafeteria/enterprise/entities/produto-categoria';
import { PrismaService } from '../prisma.service';
import { PrismaProdutoCategoriaMapper } from '../mappers/prisma-produto-categoria.mapper';

@Injectable()
export class PrismaProdutosCategoriaRepository
  implements ProdutosCategoriaRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async fetch(): Promise<ProdutoCategoria[]> {
    const produtosCategoria = await this.prisma.produto_categoria.findMany();

    return produtosCategoria.map(PrismaProdutoCategoriaMapper.toDomain);
  }
}
