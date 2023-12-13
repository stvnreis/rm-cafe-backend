import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  EditProdutoUseCase,
  EditProdutoUseCaseRequest,
} from 'src/domain/cafeteria/application/use-cases/edit-produto.use-case';

@Controller('produtos/:id')
export class EditProdutoController {
  constructor(
    private readonly editProdutoControllerUseCase: EditProdutoUseCase,
  ) {}

  @Patch()
  async handler(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditProdutoUseCaseRequest,
  ) {
    try {
      await this.editProdutoControllerUseCase.execute({ id, ...data });

      return { message: 'Produto salvo com sucesso!' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
