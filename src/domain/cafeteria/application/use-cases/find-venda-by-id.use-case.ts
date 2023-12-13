import { Injectable } from '@nestjs/common';
import { DatabaseLogin } from 'src/core/types/database-login';
import { Venda } from '../../enterprise/entities/venda';
import { ItemVenda } from '../../enterprise/entities/item-venda';
import { Funcionario } from '../../enterprise/entities/funcionario';
import { Produto } from '../../enterprise/entities/produto';
import { VendasRepository } from '../repositories/vendas.repository';

export type FindVendaByIdUseCaseRequest = {
  login: DatabaseLogin;
  idVenda: number;
};

export type FindVendaByIdUseCaseResponse = {
  venda: Venda;
  items: ItemVenda[];
  produtos: Produto[];
  funcionario: Funcionario;
};

@Injectable()
export class FindVendaByIdUseCase {
  constructor(private readonly vendasRepository: VendasRepository) {}

  async execute({ idVenda }: FindVendaByIdUseCaseRequest) {
    const { venda, produtos, items, funcionario } =
      await this.vendasRepository.findById(idVenda);

    return {
      venda,
      items,
      produtos,
      funcionario,
    };
  }
}
