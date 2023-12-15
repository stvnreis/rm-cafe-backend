import { InMemoryProdutosRepository } from 'test/repositories/in-memory-produtos.repository';
import { InMemoryVendasRepository } from 'test/repositories/in-memory-vendas.repository';
import { RealizarVendaUseCase } from './realizar-venda.use-case';
import { makeProduto } from 'test/factories/make-produto';

describe('Realizar Venda', () => {
  let sut: RealizarVendaUseCase;
  let inMemoryProdutosRepository: InMemoryProdutosRepository;
  let inMemoryVendasRepository: InMemoryVendasRepository;

  beforeEach(() => {
    inMemoryProdutosRepository = new InMemoryProdutosRepository();
    inMemoryVendasRepository = new InMemoryVendasRepository();

    sut = new RealizarVendaUseCase(inMemoryVendasRepository);
  });

  it('should be able to sell a product and have no more', async () => {
    const produto = makeProduto();

    await inMemoryProdutosRepository.create(produto);
    await sut.execute({
      produtos: [
        {
          id: Number(produto.id.value),
          descricao: produto.descricao,
          quantidade: 1,
          valor: produto.valor,
        },
      ],
      idFuncionario: 1,
    });

    expect(inMemoryVendasRepository.items).toHaveLength(1);
    expect(inMemoryVendasRepository.items[0].valorTotal).toEqual(produto.valor);
    // expect(inMemoryProdutosRepository.items[0].quantidade).toEqual(
    //   produto.quantidade - 1,
    // );
  });
});
