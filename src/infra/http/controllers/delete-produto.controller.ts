import {
  BadRequestException,
  Controller,
  Delete,
  Headers,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DeleteProdutoUseCase } from 'src/domain/cafeteria/application/use-cases/delete-produto.use-case';

@Controller('produtos/:id')
export class DeleteProdutoController {
  constructor(private readonly deleteProdutoUseCase: DeleteProdutoUseCase) {}

  @Delete()
  async handle(
    @Param('id', ParseIntPipe) idProduto: number,
    @Headers('user') user: string,
    @Headers('password') password: string,
  ) {
    try {
      await this.deleteProdutoUseCase.execute({
        idProduto,
        login: { user, password },
      });

      return { message: 'Produto deletado com sucesso!' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
