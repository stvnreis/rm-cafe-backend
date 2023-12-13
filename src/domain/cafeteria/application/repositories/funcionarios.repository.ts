import { FetchOptions } from 'src/core/repositories/fetch-options';
import { Funcionario } from '../../enterprise/entities/funcionario';

export abstract class FuncionariosRepository {
  abstract fetch(options?: FetchOptions): Promise<Funcionario[]>;
}
