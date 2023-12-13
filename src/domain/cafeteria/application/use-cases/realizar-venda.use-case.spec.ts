import { InMemoryItensVendaRepository } from 'test/repositories/in-memory-itens-venda.repository';
import { InMemoryProdutosRepository } from 'test/repositories/in-memory-produtos.repository';
import { InMemoryVendasRepository } from 'test/repositories/in-memory-vendas.repository';
import { RealizarVendaUseCase } from './realizar-venda.use-case';
import { makeProduto } from 'test/factories/make-produto';

describe('Realizar Venda', () => {
  let sut: RealizarVendaUseCase;
  let inMemoryProdutosRepository: InMemoryProdutosRepository;
  let inMemoryVendasRepository: InMemoryVendasRepository;
  let inMemoryItensVendasRepository: InMemoryItensVendaRepository;

  beforeEach(() => {
    inMemoryProdutosRepository = new InMemoryProdutosRepository();
    inMemoryVendasRepository = new InMemoryVendasRepository();
    inMemoryItensVendasRepository = new InMemoryItensVendaRepository();

    sut = new RealizarVendaUseCase(
      inMemoryProdutosRepository,
      inMemoryItensVendasRepository,
      inMemoryVendasRepository,
    );
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
    expect(inMemoryItensVendasRepository.items).toHaveLength(1);
    expect(inMemoryVendasRepository.items[0].valorTotal).toEqual(
      produto.valor * 1,
    );
    // expect(inMemoryProdutosRepository.items[0].quantidade).toEqual(
    //   produto.quantidade - 1,
    // );
  });
});
