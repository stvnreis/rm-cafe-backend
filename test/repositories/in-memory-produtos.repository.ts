import { ProdutosRepository } from 'src/domain/cafeteria/application/repositories/produtos.repository';
import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';

export class InMemoryProdutosRepository implements ProdutosRepository {
  items: Produto[] = [];

  async create(entity: Produto): Promise<void> {
    this.items.push(entity);
  }

  async fetch(): Promise<Produto[]> {
    const produtos = this.items;

    return produtos;
  }

  async findByid(id: number): Promise<Produto> {
    const produto = this.items.find((item) => item.id.value === id);
    if (!produto) return null;

    return produto;
  }

  async save(entity: Produto): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id.value === entity.id.value,
    );

    this.items[itemIndex] = entity;
  }
}
