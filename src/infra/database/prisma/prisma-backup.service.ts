import { Injectable } from '@nestjs/common';
import { DatabaseLogin } from 'src/core/types/database-login';
import { exec } from 'child_process';
import { promisify } from 'util';
import { EnvService } from 'src/infra/env/env.service';

const executeAsync = promisify(exec);

export type PrismaBackupServiceRequest = {
  login: DatabaseLogin;
  filePath?: string;
  fileName?: string;
};

@Injectable()
export class PrismaBackupService {
  constructor(private readonly envService: EnvService) {}

  async execute({ filePath, fileName }: PrismaBackupServiceRequest) {
    const backupFileName = `${new Date().toISOString()}.backup`;

    await executeAsync(
      `pg_dump -Fc -v -b -d postgresql://stvnreis:HUMnFe9AfV7S@${this.envService.get(
        'HOST',
      )}/ecom -f ${filePath ?? '/home/stvnreis/workspace/pessoal/backup-bd2/'}${
        fileName ?? backupFileName
      }`,
    );
  }
}
