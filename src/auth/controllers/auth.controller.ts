import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { localAuthGuard } from '../guard/local-auth.guard';
import { UsuarioLogin } from '../intities/usuariologin.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('/usuarios')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(localAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logar')
  async login(@Body() usuarioLogin: UsuarioLogin): Promise<any> {
    return this.authService.login(usuarioLogin);
  }
}
