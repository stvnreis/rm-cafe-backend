import { Prisma, vendas as PrismaVenda } from '@prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Venda } from 'src/domain/cafeteria/enterprise/entities/venda';

export class PrismaVendaMapper {
  static toDomain(raw: PrismaVenda): Venda {
    return Venda.create(
      {
        idFuncionario: UniqueEntityId.createFromRaw(raw.id_funcionario),
        valorTotal: Number(raw.valor_total),
        venHorario: raw.ven_horario,
      },
      UniqueEntityId.createFromRaw(raw.id),
    );
  }
  static toPrisma(entity: Venda): Prisma.vendasUncheckedCreateInput {
    return {
      id_funcionario: entity.idFuncionario.value,
      valor_total: entity.valorTotal,
      ven_horario: entity.venHorario,
    };
  }
}
