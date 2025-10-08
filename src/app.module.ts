import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './Tema/entities/tema.entity';
import { TemaModule } from './Tema/tema.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localHost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema],
      synchronize: true,
      logging: true,
    }),
    PostagemModule,
    TemaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
