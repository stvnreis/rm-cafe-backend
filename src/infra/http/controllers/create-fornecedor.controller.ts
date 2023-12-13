// import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
// import {
//   CreateFornecedorUseCase,
//   CreateFornecedorUseCaseRequest,
// } from 'src/domain/cafeteria/application/use-cases/create-fornecedor.use-case';

// @Controller('fornecedores')
// export class CreateFornecedorController {
//   constructor(
//     private readonly createFornecedorUseCase: CreateFornecedorUseCase,
//   ) {}

//   @Post()
//   async handle(@Body() data: CreateFornecedorUseCaseRequest) {
//     try {
//       await this.createFornecedorUseCase.execute({ ...data });

//       return { message: 'Fornecedor cadastrado com sucesso!' };
//     } catch (err) {
//       throw new BadRequestException('Erro ao cadastrar fornecedor!');
//     }
//   }
// }
