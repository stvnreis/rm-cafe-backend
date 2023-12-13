import { ItensVendaRepository } from 'src/domain/cafeteria/application/repositories/itens-venda.repository';
import { ItemVenda } from 'src/domain/cafeteria/enterprise/entities/item-venda';

export class InMemoryItensVendaRepository implements ItensVendaRepository {
  items: ItemVenda[] = [];

  async create(entity: ItemVenda): Promise<void> {
    this.items.push(entity);
  }
}
