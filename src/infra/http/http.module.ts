import { Module } from '@nestjs/common';
import { FetchProdutosUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-produtos.use-case';
import { FetchProdutosController } from './controllers/fetch-produtos.controller';
import { CreateProdutoUseCase } from 'src/domain/cafeteria/application/use-cases/create-produto.use-case';
import { CreateProdutoController } from './controllers/create-produto.controller';
import { AutenticarFuncionarioController } from './controllers/autenticar-funcionario.controller';
import { AutenticarFuncionarioUseCase } from 'src/domain/cafeteria/application/use-cases/autenticar-funcionario.use-case';
import { DeleteProdutoController } from './controllers/delete-produto.controller';
import { DeleteProdutoUseCase } from 'src/domain/cafeteria/application/use-cases/delete-produto.use-case';
import { FindProdutoByIdUseCase } from 'src/domain/cafeteria/application/use-cases/find-produto-by-id.use-case';
import { FindProdutoByIdController } from './controllers/find-produto-by-id.controller';
import { RealizarVendaUseCase } from 'src/domain/cafeteria/application/use-cases/realizar-venda.use-case';
import { RealizarVendasController } from './controllers/realizar-venda.controller';
import { FetchVendasController } from './controllers/fetch-vendas.controller';
import { FetchVendasUseCase } from 'src/domain/cafeteria/application/use-cases/fetch-vendas.use-case';
import { FindVendaByIdController } from './controllers/find-venda-by-id.controller';
import { FindVendaByIdUseCase } from 'src/domain/cafeteria/application/use-cases/find-venda-by-id.use-case';
import { GetBackupController } from './controllers/get-backup.controller';
import { PrismaBackupService } from '../database/prisma/prisma-backup.service';
import { EditProdutoController } from './controllers/edit-produto.controller';
import { EditProdutoUseCase } from 'src/domain/cafeteria/application/use-cases/edit-produto.use-case';

@Module({
  imports: [],
  controllers: [
    // CreateFornecedorController,
    // FetchFornecedoresController,
    RealizarVendasController,
    FetchProdutosController,
    FindProdutoByIdController,
    CreateProdutoController,
    AutenticarFuncionarioController,
    DeleteProdutoController,
    FetchVendasController,
    FindVendaByIdController,
    GetBackupController,
    EditProdutoController,
  ],
  providers: [
    // CreateFornecedorUseCase,
    // FetchFornecedoresUseCase,
    RealizarVendaUseCase,
    FetchProdutosUseCase,
    FindProdutoByIdUseCase,
    CreateProdutoUseCase,
    AutenticarFuncionarioUseCase,
    DeleteProdutoUseCase,
    FetchVendasUseCase,
    FindVendaByIdUseCase,
    PrismaBackupService,
    EditProdutoUseCase,
  ],
})
export class HttpModule {}
