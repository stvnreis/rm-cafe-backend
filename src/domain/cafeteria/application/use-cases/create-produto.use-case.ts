import { Injectable } from '@nestjs/common';
import { Produto } from '../../enterprise/entities/produto';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { ProdutosRepository } from '../repositories/produtos.repository';

export type CreateProdutoUseCaseRequest = {
  descricao: string;
  fotoUrl: string;
  idFornecedor: number;
  idProdutoCategoria: number;
  valor: number;
  quantidade: number;
};

export type CreateProdutoUseCaseResponse = {
  produto: Produto;
};

@Injectable()
export class CreateProdutoUseCase {
  constructor(private readonly produtosRepository: ProdutosRepository) {}

  async execute(
    request: CreateProdutoUseCaseRequest,
  ): Promise<CreateProdutoUseCaseResponse> {
    const data = Produto.create({
      ...request,
      idFornecedor: UniqueEntityId.createFromRaw(request.idFornecedor),
      idProdutoCategoria: UniqueEntityId.createFromRaw(
        request.idProdutoCategoria,
      ),
    });

    const produto = await this.produtosRepository.create(data);

    return { produto };
  }
}
