import { Controller, Get, All, Req, Res, Next } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProxyService } from './proxy.service';
import { Request, Response, NextFunction } from 'express';

@ApiTags('proxy')
@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('services')
  getServices() {
    return { code: 200, data: this.proxyService.getAllRoutes(), timestamp: Date.now() };
  }
}
