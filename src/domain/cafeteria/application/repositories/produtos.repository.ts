import { Produto } from '../../enterprise/entities/produto';

export abstract class ProdutosRepository {
  abstract create(entity: Produto): Promise<Produto>;
  abstract fetch(): Promise<Produto[]>;
  abstract findByid(id: number): Promise<Produto>;
  abstract save(entity: Produto): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
