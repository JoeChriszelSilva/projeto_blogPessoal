import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Postagem } from '../../postagem/entities/postagem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 5000, nullable: true })
  @ApiProperty()
  foto: string;

  @OneToMany(() => Postagem, (postagem) => postagem.usuario)
  postagem: Postagem[];
}
