import { ProdutoCategoria } from 'src/domain/cafeteria/enterprise/entities/produto-categoria';

export class ProdutoCategoriaPresenter {
  static toHttp(entity: ProdutoCategoria) {
    return {
      id: entity.id.toNumber(),
      dsCategoria: entity.dsCategoria,
    };
  }
}
