import { UsuarioService } from './../../usuario/service/usuario.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from '../bcrypt/bcrypt';
import { usuarioLogin } from '../intities/usuariologim.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const buscarUsuario = await this.usuarioService.findByUsuario(username);
    if (!buscarUsuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }
    const matchPassword = await this.bcrypt.compararSenhas(
      password,
      buscarUsuario.senha,
    );

    if (buscarUsuario && matchPassword) {
      const { senha, ...resposta } = buscarUsuario;
    }

    return null;
  }

  async login(usuarioLogin: usuarioLogin) {
    const payload = { username: usuarioLogin.usuario };
    const buscarUsuario = await this.usuarioService.findByUsuario(
      usuarioLogin.usuario,
    );
    return {
      id: buscarUsuario.id,
      nome: buscarUsuario.nome,
      usuario: buscarUsuario.usuario,
      senha: '',
      foto: buscarUsuario.foto,
      token: `bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
