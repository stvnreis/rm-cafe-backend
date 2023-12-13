import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type ItemVendaProps = {
  quantidade: number;
  valor: number;
  idProduto: UniqueEntityId;
  idVenda: UniqueEntityId;
};

export class ItemVenda extends Entity<ItemVendaProps> {
  get quantidade() {
    return this.props.quantidade;
  }
  get valor() {
    return this.props.valor;
  }
  get idProduto() {
    return this.props.idProduto;
  }
  get idVenda() {
    return this.props.idVenda;
  }

  set idVenda(idVenda: UniqueEntityId) {
    this.props.idVenda = idVenda;
  }

  static create(props: ItemVendaProps, id?: UniqueEntityId) {
    return new ItemVenda(props, id);
  }
}
