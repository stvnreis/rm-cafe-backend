import { Injectable } from '@nestjs/common';
import { ItemVenda } from '../../enterprise/entities/item-venda';
import { Venda } from '../../enterprise/entities/venda';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { VendasRepository } from '../repositories/vendas.repository';
import { sumArray } from 'src/core/helpers/sum-array';

export type RealizarVendaUseCaseRequest = {
  produtos: {
    id: number;
    quantidade: number;
    descricao: string;
    valor: number;
  }[];
  idFuncionario: number;
};

@Injectable()
export class RealizarVendaUseCase {
  constructor(private readonly vendasRepository: VendasRepository) {}

  async execute({
    produtos,
    idFuncionario,
  }: RealizarVendaUseCaseRequest): Promise<void> {
    const valorTotal = sumArray(
      produtos.map((produto) => produto.quantidade * produto.valor),
    );

    const venda = Venda.create({
      idFuncionario: UniqueEntityId.createFromRaw(idFuncionario),
      valorTotal,
    });

    const items = produtos.map((produto) => {
      return ItemVenda.create({
        idProduto: UniqueEntityId.createFromRaw(produto.id),
        idVenda: venda.id,
        quantidade: produto.quantidade,
        valor: produto.valor,
      });
    });

    await this.vendasRepository.create(venda, items);
  }
}
