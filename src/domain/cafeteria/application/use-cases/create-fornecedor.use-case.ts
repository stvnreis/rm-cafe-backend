// import { Injectable } from '@nestjs/common';
// import { FornecedoresRepository } from '../repositories/vendedores.repository';
// import { Fornecedor } from '../../enterprise/entities/fornecedor';

// export type CreateFornecedorUseCaseRequest = {
//   descricao: string;
// };

// @Injectable()
// export class CreateFornecedorUseCase {
//   constructor(
//     // private readonly fornecedoresRepository: FornecedoresRepository,
//   ) {}

//   async execute({ descricao }: CreateFornecedorUseCaseRequest): Promise<void> {
//     const fornecedor = Fornecedor.create({ descricao });

//     await this.fornecedoresRepository.create(fornecedor);
//   }
// }
