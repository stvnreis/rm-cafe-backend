import { Injectable } from '@nestjs/common';
import {
  FetchProdutosResponse,
  ProdutosRepository,
} from '../repositories/produtos.repository';
import { FetchProdutosQueryOptions } from 'src/infra/http/controllers/fetch-produtos.controller';

export interface FetchProdutosUseCaseRequest
  extends FetchProdutosQueryOptions {}

export interface FetchProdutosUseCaseResponse extends FetchProdutosResponse {}

@Injectable()
export class FetchProdutosUseCase {
  constructor(private readonly produtosRepository: ProdutosRepository) {}

  async execute({
    relations,
    ids,
    dsCategoria,
  }: FetchProdutosUseCaseRequest): Promise<FetchProdutosUseCaseResponse> {
    const { produtos } = await this.produtosRepository.fetch({
      relations,
      ids,
      dsCategoria,
    });

    return { produtos };
  }
}
