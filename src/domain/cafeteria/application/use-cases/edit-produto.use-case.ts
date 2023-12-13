import { Injectable } from '@nestjs/common';
import { ProdutosRepository } from '../repositories/produtos.repository';
import { CreateProdutoUseCaseRequest } from './create-produto.use-case';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error';

export interface EditProdutoUseCaseRequest
  extends Partial<CreateProdutoUseCaseRequest> {
  id: number;
}

@Injectable()
export class EditProdutoUseCase {
  constructor(private readonly produtosRepository: ProdutosRepository) {}

  async execute(data: EditProdutoUseCaseRequest): Promise<void> {
    const produto = await this.produtosRepository.findByid(data.id);
    if (!produto)
      throw new ResourceNotFoundError(`Produto ${data.id} não encontrado!`);

    produto.descricao = data.descricao;
    produto.idFornecedor = UniqueEntityId.createFromRaw(data.idFornecedor);
    produto.fotoUrl = data.fotoUrl;
    produto.quantidade = data.quantidade;
    produto.valor = data.valor;

    await this.produtosRepository.save(produto);
  }
}
