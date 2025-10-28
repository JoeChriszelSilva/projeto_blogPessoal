import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Bcrypt {
  async criptografarSenha(senha: string): Promise<string> {
    const saltos: number = 10;
    return await bcrypt.hash(senha, saltos);
  }

  async compararSenhas(
    SenhaDigitada: string,
    senhaBanco: string,
  ): Promise<boolean> {
    return await bcrypt.compare(SenhaDigitada, senhaBanco);
  }
}
