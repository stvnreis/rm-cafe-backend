import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { FornecedoresRepository } from 'src/domain/cafeteria/application/repositories/vendedores.repository';
import { PrismaFornecedoresRepository } from './prisma/repositories/prisma-fornecedores.repository';
import { ItensVendaRepository } from 'src/domain/cafeteria/application/repositories/itens-venda.repository';
import { PrismaItensVendaRepository } from './prisma/repositories/prisma-itens-venda.repository';
import { ProdutosRepository } from 'src/domain/cafeteria/application/repositories/produtos.repository';
import { PrismaProdutosRepository } from './prisma/repositories/prisma-produtos.repository';
import { FuncionariosRepository } from 'src/domain/cafeteria/application/repositories/funcionarios.repository';
import { PrismaFuncionariosRepository } from './prisma/repositories/prisma-funcionarios.repository';
import { PrismaVendasRepository } from './prisma/repositories/prisma-vendas.repository';
import { VendasRepository } from 'src/domain/cafeteria/application/repositories/vendas.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: FornecedoresRepository, useClass: PrismaFornecedoresRepository },
    { provide: ItensVendaRepository, useClass: PrismaItensVendaRepository },
    { provide: ProdutosRepository, useClass: PrismaProdutosRepository },
    { provide: FuncionariosRepository, useClass: PrismaFuncionariosRepository },
    { provide: VendasRepository, useClass: PrismaVendasRepository },
  ],
  exports: [
    PrismaService,
    FornecedoresRepository,
    ItensVendaRepository,
    ProdutosRepository,
    FuncionariosRepository,
    VendasRepository,
  ],
})
export class DatabaseModule {}
