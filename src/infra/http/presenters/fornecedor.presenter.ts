import { Fornecedor } from 'src/domain/cafeteria/enterprise/entities/fornecedor';

export class FornecedorPresenter {
  static toHttp(entity: Fornecedor) {
    return {
      id: Number(entity.id.value),
      descricao: entity.descricao,
    };
  }
}
