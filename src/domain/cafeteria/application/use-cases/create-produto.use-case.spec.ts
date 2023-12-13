import { InMemoryProdutosRepository } from 'test/repositories/in-memory-produtos.repository';
import { CreateProdutoUseCase } from './create-produto.use-case';
import { makeProduto } from 'test/factories/make-produto';

describe('Cadastrar produto', () => {
  let sut: CreateProdutoUseCase;
  let inMemoryProdutosRepository: InMemoryProdutosRepository;

  beforeEach(() => {
    inMemoryProdutosRepository = new InMemoryProdutosRepository();
    sut = new CreateProdutoUseCase(inMemoryProdutosRepository);
  });

  it('should be able to create a produto', async () => {
    const produto = makeProduto();

    await sut.execute({
      descricao: produto.descricao,
      fotoUrl: produto.fotoUrl,
      idFornecedor: produto.idFornecedor.toNumber(),
      quantidade: produto.quantidade,
      valor: produto.valor,
    });

    expect(inMemoryProdutosRepository.items).toHaveLength(1);
    expect(inMemoryProdutosRepository.items[0].descricao).toEqual(
      produto.descricao,
    );
  });
});
