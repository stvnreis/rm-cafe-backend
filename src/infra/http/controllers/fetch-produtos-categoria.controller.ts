import { BadRequestException, Controller, Get } from '@nestjs/common';
import { FetchProdutosCategoriaUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-produtos-categoria.use-case';
import { ProdutoCategoriaPresenter } from '../presenters/produto-categoria.presenter';

@Controller('categorias')
export class FetchProdutosCategoriaController {
  constructor(
    private readonly fetchProdutosCategoriaUseCase: FetchProdutosCategoriaUseCase,
  ) {}

  @Get()
  async handler() {
    try {
      const { produtosCategoria } =
        await this.fetchProdutosCategoriaUseCase.execute();

      return { data: produtosCategoria.map(ProdutoCategoriaPresenter.toHttp) };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
