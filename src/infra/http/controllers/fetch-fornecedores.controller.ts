// import { BadRequestException, Controller, Get } from '@nestjs/common';
// import { FetchFornecedoresUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-fornecedores.use-case';
// import { FornecedorPresenter } from '../presenters/fornecedor.presenter';

// @Controller('fornecedores')
// export class FetchFornecedoresController {
//   constructor(
//     private readonly fetchFornecedoresUseCase: FetchFornecedoresUseCase,
//   ) {}

//   @Get()
//   async handle() {
//     try {
//       const { fornecedores } = await this.fetchFornecedoresUseCase.execute();

//       return { data: fornecedores.map(FornecedorPresenter.toHttp) };
//     } catch (err) {
//       throw new BadRequestException('Erro ao buscar fornecedores!');
//     }
//   }
// }
