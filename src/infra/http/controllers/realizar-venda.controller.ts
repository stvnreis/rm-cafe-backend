import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  RealizarVendaUseCase,
  RealizarVendaUseCaseRequest,
} from 'src/domain/cafeteria/application/use-cases/realizar-venda.use-case';

@Controller('vendas')
export class RealizarVendasController {
  constructor(private readonly realizarVendaUseCase: RealizarVendaUseCase) {}

  @Post()
  async handle(@Body() data: RealizarVendaUseCaseRequest) {
    try {
      await this.realizarVendaUseCase.execute({
        ...data,
      });

      return { message: 'Venda realizada com sucesso!' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
