import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export type AutenticarFuncionarioUseCaseRequest = {
  user: string;
  password: string;
};

export type AutenticarFuncionarioUseCaseResponse = {
  idFuncionario: bigint;
};

@Injectable()
export class AutenticarFuncionarioUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    data: AutenticarFuncionarioUseCaseRequest,
  ): Promise<AutenticarFuncionarioUseCaseResponse> {
    const funcionario = await this.prisma.funcionarios.findFirst({
      where: { usuario: data.user },
    });

    if (!funcionario || funcionario.senha !== data.password)
      throw new Error('Usuário ou senha inválido!');

    return { idFuncionario: funcionario.id };
  }
}
