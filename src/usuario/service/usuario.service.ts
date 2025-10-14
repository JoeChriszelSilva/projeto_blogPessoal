import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './../entities/usuario.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscarUsuario = await this.findByUsuario(usuario.usuario);
    if (buscarUsuario) {
      throw new HttpException('O Usuario Já existe!', HttpStatus.BAD_REQUEST);
    }
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);
    const buscarUsuario = await this.findByUsuario(usuario.usuario);
    if (buscarUsuario && buscarUsuario.id !== usuario.id) {
      throw new HttpException(
        'Usuario (e-mail) já cadastrado!',
        HttpStatus.BAD_REQUEST,
      );
    }
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario);
  }
}
