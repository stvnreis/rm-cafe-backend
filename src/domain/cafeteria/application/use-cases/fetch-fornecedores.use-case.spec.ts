import { InMemoryFornecedoresRepository } from 'test/repositories/in-memory-fornecedores.repositoriy';
import { FetchFornecedoresUseCase } from './fetch-fornecedores.use-case';
import { Fornecedor } from '../../enterprise/entities/fornecedor';

describe('Cadastrar fornecedor', () => {
  let sut: FetchFornecedoresUseCase;
  let inMemoryFornecedoresRepository: InMemoryFornecedoresRepository;

  beforeEach(() => {
    inMemoryFornecedoresRepository = new InMemoryFornecedoresRepository();
    sut = new FetchFornecedoresUseCase(inMemoryFornecedoresRepository);
  });

  it('should be able to Fetch a fornecedor', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryFornecedoresRepository.create(
        Fornecedor.create({ descricao: 'teste' }),
      );
    }
    const { fornecedores } = await sut.execute();

    expect(fornecedores).toHaveLength(10);
  });
});
