import {
  Produto,
  ProdutoProps,
} from 'src/domain/cafeteria/enterprise/entities/produto';
import { faker } from '@faker-js/faker';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export function makeProduto(
  override: Partial<ProdutoProps> = {},
  id?: UniqueEntityId,
): Produto {
  return Produto.create(
    {
      descricao: override.descricao ?? faker.word.noun(),
      idFornecedor: override.idFornecedor ?? UniqueEntityId.create(),
      quantidade: override.quantidade ?? 1,
      valor: override.valor ?? faker.number.float(),
      fotoUrl: override.fotoUrl ?? faker.internet.url(),
    },
    id,
  );
}
