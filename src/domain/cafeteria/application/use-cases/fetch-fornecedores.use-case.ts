// import { Injectable } from '@nestjs/common';
// import { Fornecedor } from '../../enterprise/entities/fornecedor';
// import { FornecedoresRepository } from '../repositories/vendedores.repository';

// export type FetchFornecedoresUseCaseResponse = {
//   fornecedores: Fornecedor[];
// };

// @Injectable()
// export class FetchFornecedoresUseCase {
//   constructor(
//     // private readonly fornecedoresRepository: FornecedoresRepository,
//   ) {}

//   async execute(): Promise<FetchFornecedoresUseCaseResponse> {
//     const fornecedores = await this.fornecedoresRepository.fetch();

//     return { fornecedores };
//   }
// }
