import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { VendasRepository } from 'src/domain/cafeteria/application/repositories/vendas.repository';
import { Venda } from 'src/domain/cafeteria/enterprise/entities/venda';

export class InMemoryVendasRepository implements VendasRepository {
  items: Venda[] = [];

  async create(entity: Venda): Promise<UniqueEntityId> {
    this.items.push(entity);

    return entity.id;
  }

  async fetch(): Promise<Venda[]> {
    return this.items;
  }
}
