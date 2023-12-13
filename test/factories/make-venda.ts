import { faker } from '@faker-js/faker';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import {
  Venda,
  VendaProps,
} from 'src/domain/cafeteria/enterprise/entities/venda';

export function makeVenda(override: Partial<VendaProps> = {}): Venda {
  return Venda.create({
    idFuncionario: UniqueEntityId.create(),
    valorTotal: override.valorTotal ?? faker.number.float(),
    venHorario: override.venHorario ?? faker.date.anytime(),
  });
}
