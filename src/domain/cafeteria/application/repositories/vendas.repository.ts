import { Venda } from '../../enterprise/entities/venda';
import { Funcionario } from '../../enterprise/entities/funcionario';
import { Produto } from '../../enterprise/entities/produto';
import { ItemVenda } from '../../enterprise/entities/item-venda';

export type findByIdDomainResponse = {
  venda: Venda;
  items: ItemVenda[];
  produtos: Produto[];
  funcionario: Funcionario;
};

export type fetchVendasWithRelationResponse = {
  vendas: {
    venda: Venda;
    funcionario: Funcionario;
  }[];
};

export abstract class VendasRepository {
  abstract create(entity: Venda, itensVenda: ItemVenda[]): Promise<Venda>;
  abstract fetch(): Promise<fetchVendasWithRelationResponse>;
  abstract findById(id: number): Promise<findByIdDomainResponse>;
}
