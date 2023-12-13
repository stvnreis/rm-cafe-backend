import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export type UsuarioProps = {
  dsNome: string;
  dsUsuario: string;
  dsSenha: string;
  dhInclusao: Date;
  dhAlteracao: Date;
  dhAlteracaoUsuario: Date;
};

export class Usuario extends Entity<UsuarioProps> {
  get dsNome(): string {
    return this.props.dsNome;
  }
  get dsUsuario(): string {
    return this.props.dsUsuario;
  }
  get dsSenha(): string {
    return this.props.dsSenha;
  }
  get dhInclusao(): Date {
    return this.props.dhInclusao;
  }
  get dhAlteracaoUsuario(): Date {
    return this.props.dhAlteracaoUsuario;
  }

  set dsUsuario(dsUsuario: string) {
    this.props.dsUsuario = dsUsuario;
    this.touch();

    this.props.dhAlteracaoUsuario = new Date();
  }

  set senha(dsSenha: string) {
    this.props.dsSenha = dsSenha;

    this.touch();
  }

  private touch(): void {
    this.props.dhAlteracao = new Date();
  }

  static create(props: UsuarioProps, id?: number | bigint): Usuario {
    return new Usuario({ ...props }, UniqueEntityId.createFromRaw(id));
  }
}
