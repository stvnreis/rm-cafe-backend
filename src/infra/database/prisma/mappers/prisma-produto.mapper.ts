import { Prisma, produtos as PrismaProduto } from '@prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Produto } from 'src/domain/cafeteria/enterprise/entities/produto';

export class PrismaProdutoMapper {
  static toPrisma(entity: Produto): Prisma.produtosUncheckedCreateInput {
    return {
      descricao: entity.descricao,
      id_fornecedor: entity.idFornecedor.toNumber(),
      id_produto_categoria: entity.idProdutoCategoria.toNumber(),
      quantidade: entity.quantidade,
      valor: entity.valor,
      foto_url: entity.fotoUrl,
    };
  }

  static toPrismaUpdate(entity: Produto): Prisma.produtosUncheckedUpdateInput {
    return {
      descricao: entity.descricao,
      id: entity.id.value,
      id_fornecedor: entity.idFornecedor.value,
      quantidade: entity.quantidade,
      valor: entity.valor,
      foto_url: entity.fotoUrl,
    };
  }

  static toDomain(raw: PrismaProduto): Produto {
    return Produto.create(
      {
        descricao: raw.descricao,
        idFornecedor: UniqueEntityId.createFromRaw(raw.id_fornecedor),
        idProdutoCategoria: UniqueEntityId.createFromRaw(
          raw.id_produto_categoria,
        ),
        quantidade: raw.quantidade,
        valor: Number(raw.valor),
        fotoUrl: raw.foto_url,
        dhInclusao: raw.dh_inclusao,
      },
      UniqueEntityId.createFromRaw(raw.id),
    );
  }
}
