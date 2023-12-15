import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { FetchProdutosUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-produtos.use-case';
import { ProdutoPresenter } from '../presenters/produto.presenter';
import { FetchOptions } from 'src/core/repositories/fetch-options';

export interface FetchProdutosQueryOptions extends FetchOptions {
  relations?: boolean;
  dsCategoria?: string;
}

@Controller('produtos')
export class FetchProdutosController {
  constructor(private readonly fetchProdutosUseCase: FetchProdutosUseCase) {}

  @Get()
  async handle(@Query() query?: FetchProdutosQueryOptions) {
    try {
      const { produtos } = await this.fetchProdutosUseCase.execute({
        ...query,
      });

      return {
        data: produtos.map((produto) => ProdutoPresenter.toHttp(produto)),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
