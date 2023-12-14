import { Injectable } from '@nestjs/common';
import { Venda } from '../../enterprise/entities/venda';
import { Funcionario } from '../../enterprise/entities/funcionario';
import { VendasRepository } from '../repositories/vendas.repository';
import { FuncionariosRepository } from '../repositories/funcionarios.repository';

export type FetchVendasUseCaseResponse = {
  vendas: {
    venda: Venda;
    funcionario: Funcionario;
  }[];
};

@Injectable()
export class FetchVendasUseCase {
  constructor(
    private readonly vendasRespotory: VendasRepository,
    private readonly funcionariosRepository: FuncionariosRepository,
  ) {}

  async execute(): Promise<FetchVendasUseCaseResponse> {
    const { vendas } = await this.vendasRespotory.fetch();
    // const idsFuncionarios = vendas.map((venda) =>
    //   venda.idFuncionario.toNumber(),
    // );

    // const funcionarios = await this.funcionariosRepository.fetch({
    //   ids: removeDuplicates(idsFuncionarios),
    // });

    // const data = vendas.map((venda) => {
    //   const funcionario = funcionarios.find((funcionario) =>
    //     funcionario.id.equals(venda.idFuncionario),
    //   );
    //   return {
    //     venda,
    //     funcionario: funcionario,
    //   };
    // });

    return { vendas };
  }
}
