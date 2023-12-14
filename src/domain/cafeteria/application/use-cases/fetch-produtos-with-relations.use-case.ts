import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from '../repositories/produtos.repository';
import { Produto } from '../../enterprise/entities/produto';
import { ProdutoCategoria } from '../../enterprise/entities/produto-categoria';
import { Fornecedor } from '../../enterprise/entities/fornecedor';

export type FetchProdutosWithRelationsUseCaseRequest = {
  dsCategoria?: string;
};

export type FetchProdutosWithRelationsUseCaseResponse = {
  produtos: {
    produto: Produto;
    fornecedor: Fornecedor;
    produtoCategoria: ProdutoCategoria;
  }[];
};

@Injectable()
export class FetchProdutosWithRelationsUseCase {
  constructor(private readonly produtosRepository: ProdutosRepository) {}

  async execute({
    dsCategoria,
  }: FetchProdutosWithRelationsUseCaseRequest): Promise<FetchProdutosWithRelationsUseCaseResponse> {
    const { produtos } = await this.produtosRepository.fetchWithRelations({
      dsCategoria,
    });

    return { produtos };
  }
}
