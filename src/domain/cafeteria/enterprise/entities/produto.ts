import * as dayjs from 'dayjs';
import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type ProdutoProps = {
  descricao: string;
  valor: number;
  quantidade: number;
  idFornecedor: UniqueEntityId;
  idProdutoCategoria: UniqueEntityId;
  fotoUrl: string;
  dhInclusao?: Date;
};

export class Produto extends Entity<ProdutoProps> {
  get descricao() {
    return this.props.descricao;
  }
  get valor() {
    return this.props.valor;
  }
  get quantidade() {
    return this.props.quantidade;
  }
  get idFornecedor() {
    return this.props.idFornecedor;
  }
  get idProdutoCategoria(): UniqueEntityId {
    return this.props.idProdutoCategoria;
  }
  get fotoUrl(): string {
    return this.props.fotoUrl;
  }
  get dhInclusao(): Date {
    return this.props.dhInclusao;
  }
  get eNovidade(): boolean {
    return dayjs().diff(this.props.dhInclusao, 'days') <= 10;
  }

  set quantidade(quantidade: number) {
    this.props.quantidade = quantidade;
  }
  set descricao(descricao: string) {
    this.props.descricao = descricao;
  }
  set valor(valor: number) {
    this.props.valor = valor;
  }
  set idFornecedor(idFornecedor: UniqueEntityId) {
    this.props.idFornecedor = idFornecedor;
  }
  set fotoUrl(fotoUrl: string) {
    this.props.fotoUrl = fotoUrl;
  }

  registrarSaidaEstoque(quantidade: number): void {
    this.props.quantidade -= quantidade;
  }

  static create(props: ProdutoProps, id?: UniqueEntityId) {
    return new Produto(
      {
        ...props,
        dhInclusao: props.dhInclusao ?? new Date(),
      },
      id,
    );
  }
}
