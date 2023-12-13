import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type VendaProps = {
  venHorario?: Date;
  valorTotal: number;
  idFuncionario: UniqueEntityId;
};

export class Venda extends Entity<VendaProps> {
  get venHorario() {
    return this.props.venHorario;
  }
  get valorTotal() {
    return this.props.valorTotal;
  }
  get idFuncionario() {
    return this.props.idFuncionario;
  }

  set valorTotal(valorTotal: number) {
    this.props.valorTotal = valorTotal;
  }

  static create(props: VendaProps, id?: UniqueEntityId): Venda {
    return new Venda(
      {
        venHorario: props.venHorario ?? new Date(),
        idFuncionario: props.idFuncionario,
        valorTotal: props.valorTotal,
      },
      id,
    );
  }
}
