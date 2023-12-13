import { Prisma, itens as PrismaItem } from '@prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { ItemVenda } from 'src/domain/cafeteria/enterprise/entities/item-venda';

export class PrismaItensVendaMapper {
  static toPrisma(entity: ItemVenda): Prisma.itensUncheckedCreateInput {
    return {
      id_produto: entity.idProduto.value,
      id_venda: entity.idVenda.value,
      quantidade: entity.quantidade,
      valor: entity.valor,
    };
  }

  static toDomain(raw: PrismaItem): ItemVenda {
    return ItemVenda.create(
      {
        idProduto: UniqueEntityId.createFromRaw(raw.id_produto),
        idVenda: UniqueEntityId.createFromRaw(raw.id_venda),
        quantidade: raw.quantidade,
        valor: Number(raw.valor),
      },
      UniqueEntityId.createFromRaw(raw.id),
    );
  }
}
