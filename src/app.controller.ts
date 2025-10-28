import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import express from 'express';

@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get()
  redirect(@Res() resposta: express.Response) {
    return resposta.redirect('/swagger');
  }
}
