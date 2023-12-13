import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FindVendaByIdUseCase } from 'src/domain/cafeteria/application/use-cases/find-venda-by-id.use-case';
import { VendaPresenter } from '../presenters/venda.presenter';

@Controller('vendas/:id')
export class FindVendaByIdController {
  constructor(private readonly findVendaByIdUseCase: FindVendaByIdUseCase) {}

  @Get()
  async handle(
    @Param('id', ParseIntPipe) idVenda: number,
    @Headers('user') user: string,
    @Headers('password') password: string,
  ) {
    try {
      const { venda, items, produtos, funcionario } =
        await this.findVendaByIdUseCase.execute({
          login: { user, password },
          idVenda,
        });

      return {
        data: VendaPresenter.toFindOneHttp(venda, items, produtos, funcionario),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
