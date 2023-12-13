import { BadRequestException, Controller, Get, Headers } from '@nestjs/common';

import { PrismaBackupService } from 'src/infra/database/prisma/prisma-backup.service';

@Controller('backup')
export class GetBackupController {
  constructor(private readonly prismaBackupService: PrismaBackupService) {}

  @Get()
  async handle(
    @Headers('user') user: string,
    @Headers('password') password: string,
  ) {
    try {
      await this.prismaBackupService.execute({ login: { user, password } });

      return { message: 'Backup realizado com sucesso!' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
