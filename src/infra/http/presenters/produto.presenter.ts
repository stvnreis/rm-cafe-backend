import { ProdutosWithRelations } from 'src/domain/cafeteria/application/repositories/produtos.repository';
import { Fornecedor } from 'src/domain/cafeteria/enterprise/entities/fornecedor';
import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';
import { ProdutoCategoria } from 'src/domain/cafeteria/enterprise/entities/produto-categoria';

export class ProdutoPresenter {
  static toHttp(entity: Produto | ProdutosWithRelations) {
    if (entity instanceof Produto)
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

    return this.toHttpWithRelations(
      entity.produto,
      entity.fornecedor,
      entity.produtoCategoria,
    );
  }

  static toHttpWithRelations(
    produto: Produto,
    fornecedor: Fornecedor,
    produtoCategoria: ProdutoCategoria,
  ) {
    return {
      id: Number(produto.id.value),
      descricao: produto.descricao,
      valor: produto.valor,
      quantidade: produto.quantidade,
      fotoUrl: produto.fotoUrl,
      produtoFornecedor: {
        id: fornecedor.id.toNumber(),
        dsFornecedor: fornecedor.descricao,
      },
      produtoCategoria: {
        id: produtoCategoria.id.toNumber(),
        dsCategoria: produtoCategoria.dsCategoria,
      },
      dhInclusao: produto.dhInclusao,
      eNovidade: produto.eNovidade,
    };
  }
}
