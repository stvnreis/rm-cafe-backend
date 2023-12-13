import { FornecedoresRepository } from 'src/domain/cafeteria/application/repositories/vendedores.repository';
import { Fornecedor } from 'src/domain/cafeteria/enterprise/entities/fornecedor';

export class InMemoryFornecedoresRepository implements FornecedoresRepository {
  items: Fornecedor[] = [];

  async create(entity: Fornecedor): Promise<void> {
    this.items.push(entity);
  }

  async fetch(): Promise<Fornecedor[]> {
    const fornecedores = this.items;

    return fornecedores;
  }

  async findById(id: number | bigint): Promise<Fornecedor> {
    const fornecedor = this.items.find((item) => item.id.value === id);
    if (!fornecedor) return null;

    return fornecedor;
  }
}
