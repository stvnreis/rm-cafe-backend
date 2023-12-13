import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';

export class ProdutoPresenter {
  static toHttp(entity: Produto) {
    return {
      id: Number(entity.id.value),
      descricao: entity.descricao,
      valor: entity.valor,
      quantidade: entity.quantidade,
      fotoUrl: entity.fotoUrl,
      idFornecedor: Number(entity.idFornecedor.value),
      dhInclusao: entity.dhInclusao,
      eNovidade: entity.eNovidade,
    };
  }
}
