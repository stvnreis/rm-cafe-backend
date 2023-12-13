import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type FornecedorProps = {
  descricao: string;
};

export class Fornecedor extends Entity<FornecedorProps> {
  get descricao(): string {
    return this.props.descricao;
  }

  static create(props: FornecedorProps, id?: UniqueEntityId): Fornecedor {
    return new Fornecedor(props, id);
  }
}
