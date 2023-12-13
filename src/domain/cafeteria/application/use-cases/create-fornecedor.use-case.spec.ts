import { InMemoryFornecedoresRepository } from 'test/repositories/in-memory-fornecedores.repositoriy';
import { CreateFornecedorUseCase } from './create-fornecedor.use-case';

describe('Cadastrar fornecedor', () => {
  let sut: CreateFornecedorUseCase;
  let inMemoryFornecedoresRepository: InMemoryFornecedoresRepository;

  beforeEach(() => {
    inMemoryFornecedoresRepository = new InMemoryFornecedoresRepository();
    sut = new CreateFornecedorUseCase(inMemoryFornecedoresRepository);
  });

  it('should be able to create a fornecedor', async () => {
    await sut.execute({ descricao: 'Fornecedor de Bebidas' });

    expect(inMemoryFornecedoresRepository.items).toHaveLength(1);
    expect(inMemoryFornecedoresRepository.items[0].descricao).toEqual(
      'Fornecedor de Bebidas',
    );
  });
});
