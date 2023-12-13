import { BadRequestException, Controller, Get, Headers } from '@nestjs/common';
import { AutenticarFuncionarioUseCase } from 'src/domain/cafeteria/application/use-cases/autenticar-funcionario.use-case';

@Controller('auth')
export class AutenticarFuncionarioController {
  constructor(
    private readonly autenticarFuncionarioUseCase: AutenticarFuncionarioUseCase,
  ) {}

  @Get()
  async handler(
    @Headers('user') user: string,
    @Headers('password') password: string,
  ) {
    try {
      const { idFuncionario } = await this.autenticarFuncionarioUseCase.execute(
        {
          user,
          password,
        },
      );

      return {
        data: { idFuncionario: Number(idFuncionario) },
        message: 'Sucesso!',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
