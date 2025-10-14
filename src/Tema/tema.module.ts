import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Tema } from './entities/tema.entity';
import { TemaService } from './services/tema.service';
import { temaController } from './controllers/tema.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Tema])],
  controllers: [temaController],
  providers: [TemaService],
  exports: [TemaService],
})
export class TemaModule {}
