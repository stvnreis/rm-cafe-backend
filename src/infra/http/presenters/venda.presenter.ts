import { Funcionario } from 'src/domain/cafeteria/enterprise/entities/funcionario';
import { ItemVenda } from 'src/domain/cafeteria/enterprise/entities/item-venda';
import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';
import { Venda } from 'src/domain/cafeteria/enterprise/entities/venda';

export class VendaPresenter {
  static toHttp(venda: Venda, funcionario: Funcionario) {
    return {
      id: Number(venda.id.value),
      valorTotal: venda.valorTotal,
      venHorario: venda.venHorario,
      funcionario: {
        id: Number(funcionario.id.value),
        nome: funcionario.nome,
      },
    };
  }

  static toFindOneHttp(
    venda: Venda,
    items: ItemVenda[],
    produtos: Produto[],
    funcionario: Funcionario,
  ) {
    return {
      id: Number(venda.id.value),
      valorTotal: venda.valorTotal,
      venHorario: venda.venHorario,
      funcionario: {
        id: Number(funcionario.id.value),
        nome: funcionario.nome,
      },
      items: items.map((item) => {
        return {
          idItemVenda: Number(item.id.value),
          idProduto: Number(item.idProduto.value),
          descricao: produtos.find(
            (produto) =>
              Number(produto.id.value) === Number(item.idProduto.value),
          ).descricao,
          quantidade: item.quantidade,
          valorUnitario: item.valor,
        };
      }),
    };
  }
}
