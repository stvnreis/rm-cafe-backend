import { Fornecedor } from '../../enterprise/entities/fornecedor';

export abstract class FornecedoresRepository {
  abstract create(entity: Fornecedor): Promise<void>;
  abstract fetch(): Promise<Fornecedor[]>;
  abstract findById(id: bigint | number): Promise<Fornecedor | null>;
}
