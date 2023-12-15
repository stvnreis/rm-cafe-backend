import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import {
  VendasRepository,
  fetchVendasWithRelationResponse,
  findByIdDomainResponse,
} from 'src/domain/cafeteria/application/repositories/vendas.repository';
import { Funcionario } from 'src/domain/cafeteria/enterprise/entities/funcionario';
import { ItemVenda } from 'src/domain/cafeteria/enterprise/entities/item-venda';
import { Venda } from 'src/domain/cafeteria/enterprise/entities/venda';

export class InMemoryVendasRepository implements VendasRepository {
  items: Venda[] = [];

  async create(entity: Venda, itemVenda: ItemVenda[]): Promise<Venda> {
    this.items.push(entity);

    return entity;
  }

  async fetch(): Promise<fetchVendasWithRelationResponse> {
    return {
      vendas: this.items.map((item) => {
        return {
          venda: item,
          funcionario: Funcionario.create(
            {
              nome: 'funcionario 1',
              cpf: '00000000000',
              senha: 'senha',
              idFuncao: UniqueEntityId.createFromRaw(1),
            },
            item.idFuncionario,
          ),
        };
      }),
    };
  }

  async findById(id: number): Promise<findByIdDomainResponse> {
    const venda = this.items.find((item) => item.id.toNumber() === id);

    return { venda } as findByIdDomainResponse;
  }
}
