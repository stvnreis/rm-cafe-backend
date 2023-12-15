import { ProdutoCategoria } from '../../enterprise/entities/produto-categoria';
import { Produto } from '../../enterprise/entities/produto';
import { Fornecedor } from '../../enterprise/entities/fornecedor';
import { FetchOptions } from 'src/core/repositories/fetch-options';

export type ProdutosWithRelations = {
  produto: Produto;
  fornecedor: Fornecedor;
  produtoCategoria: ProdutoCategoria;
};

export type FetchProdutosResponse = {
  produtos: Array<ProdutosWithRelations | Produto>;
};

export interface FetchProdutosOptions extends FetchOptions {
  relations?: boolean;
  dsCategoria?: string;
}

export abstract class ProdutosRepository {
  abstract create(entity: Produto): Promise<Produto>;
  abstract fetch(
    options?: FetchProdutosOptions,
  ): Promise<FetchProdutosResponse>;
  abstract findByid(id: number): Promise<Produto>;
  abstract save(entity: Produto): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
