import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register') @ApiOperation({ summary: 'Register user' })
  register(@Body() dto: any) { return this.usersService.create(dto).then(u => ({ code: 201, data: u, timestamp: Date.now() })); }

  @Post('login') @HttpCode(200) @ApiOperation({ summary: 'Login' })
  login(@Body() dto: any) { return this.usersService.login(dto).then(r => ({ code: 200, data: r, timestamp: Date.now() })); }

  @Get() @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'page', required: false }) @ApiQuery({ name: 'pageSize', required: false })
  async findAll(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    const { users, total } = await this.usersService.findAll(page, pageSize);
    return { code: 200, data: users, total, timestamp: Date.now() };
  }

  @Get(':id') @ApiOperation({ summary: 'Get user by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return { code: 200, data: await this.usersService.findById(id), timestamp: Date.now() };
  }

  @Put(':id') @ApiOperation({ summary: 'Update user' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) {
    return { code: 200, data: await this.usersService.update(id, dto), timestamp: Date.now() };
  }

  @Delete(':id') @HttpCode(204) @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id', ParseUUIDPipe) id: string) { await this.usersService.delete(id); }
}
