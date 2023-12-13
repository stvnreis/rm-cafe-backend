import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error';
import { FindProdutoByIdUseCase } from 'src/domain/cafeteria/application/use-cases/find-produto-by-id.use-case';
import { ProdutoPresenter } from '../presenters/produto.presenter';

@Controller('produtos/:id')
export class FindProdutoByIdController {
  constructor(
    private readonly findProdutoByIdUseCase: FindProdutoByIdUseCase,
  ) {}

  @Get()
  async handle(@Param('id', ParseIntPipe) id: number) {
    try {
      const { produto } = await this.findProdutoByIdUseCase.execute({
        id,
      });

      return { data: ProdutoPresenter.toHttp(produto) };
    } catch (err) {
      if (err instanceof ResourceNotFoundError)
        throw new NotFoundException(err.message);
      else throw new BadRequestException(err.message);
    }
  }
}
