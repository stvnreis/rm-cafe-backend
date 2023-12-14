import { Injectable } from '@nestjs/common';
import { ProdutoCategoria } from '../../enterprise/entities/produto-categoria';
import { ProdutosCategoriaRepository } from '../repositories/categorias.repository';

// export type FetchProdutosCategoriaUseCaseRequest = {};

export type FetchProdutosCategoriaUseCaseResponse = {
  produtosCategoria: ProdutoCategoria[];
};

@Injectable()
export class FetchProdutosCategoriaUseCase {
  constructor(
    private readonly produtosCategoriaRepository: ProdutosCategoriaRepository,
  ) {}

  async execute(): Promise<FetchProdutosCategoriaUseCaseResponse> {
    const produtosCategoria = await this.produtosCategoriaRepository.fetch();

    return { produtosCategoria };
  }
}
