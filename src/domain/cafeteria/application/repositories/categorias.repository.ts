import { ProdutoCategoria } from '../../enterprise/entities/produto-categoria';

export abstract class ProdutosCategoriaRepository {
  abstract fetch(): Promise<ProdutoCategoria[]>;
}
