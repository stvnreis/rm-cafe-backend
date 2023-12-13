import { BadRequestException, Controller, Get } from '@nestjs/common';
import { FetchVendasUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-vendas.use-case';
import { VendaPresenter } from '../presenters/venda.presenter';

@Controller('vendas')
export class FetchVendasController {
  constructor(private readonly fetchVendasUseCase: FetchVendasUseCase) {}

  @Get()
  async handle() {
    try {
      const { data } = await this.fetchVendasUseCase.execute();

      return {
        data: data.map((item) =>
          VendaPresenter.toHttp(item.venda, item.funcionario),
        ),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
