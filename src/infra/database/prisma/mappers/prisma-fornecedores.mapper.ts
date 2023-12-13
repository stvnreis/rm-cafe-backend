import { Prisma, fornecedores as PrismaFornecedor } from '@prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Fornecedor } from 'src/domain/cafeteria/enterprise/entities/fornecedor';

export class PrismaFornecedoresMapper {
  static toPrisma(
    entity: Fornecedor,
  ): Prisma.fornecedoresUncheckedCreateWithoutProdutosInput {
    return {
      id: entity.id.value,
      descricao: entity.descricao,
    };
  }

  static toDomain(raw: PrismaFornecedor): Fornecedor {
    return Fornecedor.create(
      { descricao: raw.descricao },
      UniqueEntityId.createFromRaw(raw.id),
    );
  }
}
