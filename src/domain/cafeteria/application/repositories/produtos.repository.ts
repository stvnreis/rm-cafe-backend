import { ProdutoCategoria } from '../../enterprise/entities/produto-categoria';
import { Produto } from '../../enterprise/entities/produto';
import { Fornecedor } from '../../enterprise/entities/fornecedor';

export type FetchWithRelationsResponse = {
  produtos: {
    produto: Produto;
    fornecedor: Fornecedor;
    produtoCategoria: ProdutoCategoria;
  }[];
};

export type FetchWithRelationsOptions = {
  dsCategoria?: string;
};

export abstract class ProdutosRepository {
  abstract create(entity: Produto): Promise<Produto>;
  abstract fetch(): Promise<Produto[]>;
  abstract fetchWithRelations(
    options: FetchWithRelationsOptions,
  ): Promise<FetchWithRelationsResponse>;
  abstract findByid(id: number): Promise<Produto>;
  abstract save(entity: Produto): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
