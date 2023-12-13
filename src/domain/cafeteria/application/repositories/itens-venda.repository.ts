import { ItemVenda } from '../../enterprise/entities/item-venda';

export abstract class ItensVendaRepository {
  abstract create(entity: ItemVenda): Promise<void>;
}
