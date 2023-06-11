import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsRepository } from './repositories/clients';

const repositories = [
  ClientsRepository
]

@Global()
@Module({
  providers: [PrismaService, ...repositories],
  exports: repositories
})
export class PrismaModule {}
