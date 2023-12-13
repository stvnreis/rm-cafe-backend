import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateProdutoUseCase,
  CreateProdutoUseCaseRequest,
} from 'src/domain/cafeteria/application/use-cases/create-produto.use-case';

@Controller('produtos')
export class CreateProdutoController {
  constructor(private readonly createProdutoUseCase: CreateProdutoUseCase) {}

  @Post()
  async handle(
    @Body(new ValidationPipe({ transform: true }))
    data: CreateProdutoUseCaseRequest,
  ) {
    try {
      const { produto } = await this.createProdutoUseCase.execute({
        ...data,
      });

      return {
        data: { id: Number(produto.id.value) },
        message: 'Produto cadastrado com sucesso!',
      };
    } catch (err) {
      throw new BadRequestException(`${err.code} - ${err.message}`);
    }
  }
}
