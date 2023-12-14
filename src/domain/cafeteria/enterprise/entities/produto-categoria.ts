import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type ProdutoCategoriaProps = {
  dsCategoria: string;
};

export class ProdutoCategoria extends Entity<ProdutoCategoriaProps> {
  get dsCategoria(): string {
    return this.props.dsCategoria;
  }

  set dsCategoria(dsCategoria: string) {
    this.props.dsCategoria = dsCategoria;
  }

  static create(
    props: ProdutoCategoriaProps,
    id?: UniqueEntityId,
  ): ProdutoCategoria {
    return new ProdutoCategoria({ ...props }, id);
  }
}
