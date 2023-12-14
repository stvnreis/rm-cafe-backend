import { Injectable } from '@nestjs/common';
import { FornecedoresRepository } from '../repositories/vendedores.repository';
import { Fornecedor } from '../../enterprise/entities/fornecedor';

export type CreateFornecedorUseCaseRequest = {
  descricao: string;
};

export type CreateFornecedorUseCaseResponse = {
  fornecedor: Fornecedor;
};

@Injectable()
export class CreateFornecedorUseCase {
  constructor(
    private readonly fornecedoresRepository: FornecedoresRepository,
  ) {}

  async execute({
    descricao,
  }: CreateFornecedorUseCaseRequest): Promise<CreateFornecedorUseCaseResponse> {
    const data = Fornecedor.create({ descricao });

    const fornecedor = await this.fornecedoresRepository.create(data);

    return { fornecedor };
  }
}
