import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import {
  FetchProdutosWithRelationsUseCase,
  FetchProdutosWithRelationsUseCaseRequest,
} from 'src/domain/cafeteria/application/use-cases/fetch-produtos-with-relations.use-case';
import { ProdutoPresenter } from '../presenters/produto.presenter';

export interface FetchProdutosWithRelationsQueryOptions
  extends FetchProdutosWithRelationsUseCaseRequest {}

@Controller('produtos-with-relations')
export class FetchProdutosWithRelationsController {
  constructor(
    private readonly fetchProdutosWithRelationsUseCase: FetchProdutosWithRelationsUseCase,
  ) {}

  @Get()
  async handler(@Query() query: FetchProdutosWithRelationsQueryOptions) {
    try {
      const { produtos } = await this.fetchProdutosWithRelationsUseCase.execute(
        { ...query },
      );

      return {
        data: produtos.map((produto) =>
          ProdutoPresenter.toHttpWithRelations(
            produto.produto,
            produto.fornecedor,
            produto.produtoCategoria,
          ),
        ),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
