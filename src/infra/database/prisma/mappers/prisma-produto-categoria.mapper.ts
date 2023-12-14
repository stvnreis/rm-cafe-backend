import { produto_categoria as PrismaProdutoCategoria } from '@prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { ProdutoCategoria } from 'src/domain/cafeteria/enterprise/entities/produto-categoria';

export class PrismaProdutoCategoriaMapper {
  static toDomain(raw: PrismaProdutoCategoria): ProdutoCategoria {
    return ProdutoCategoria.create(
      { dsCategoria: raw.descricao },
      UniqueEntityId.createFromRaw(raw.id),
    );
  }
}
