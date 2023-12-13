import { Injectable } from '@nestjs/common';
import { DatabaseLogin } from 'src/core/types/database-login';
import { ProdutosRepository } from '../repositories/produtos.repository';

export type DeleteProdutoUseCaseRequest = {
  login: DatabaseLogin;
  idProduto: number;
};

@Injectable()
export class DeleteProdutoUseCase {
  constructor(private readonly produtosRepository: ProdutosRepository) {}

  async execute({ idProduto }: DeleteProdutoUseCaseRequest): Promise<void> {
    await this.produtosRepository.delete(idProduto);
  }
}
