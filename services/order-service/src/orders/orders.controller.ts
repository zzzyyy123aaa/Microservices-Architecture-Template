import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post() @ApiOperation({ summary: 'Create order' })
  async create(@Body() dto: any) { return { code: 201, data: await this.ordersService.create(dto), timestamp: Date.now() }; }

  @Get() @ApiOperation({ summary: 'Get all orders' })
  @ApiQuery({ name: 'page', required: false }) @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'userId', required: false }) @ApiQuery({ name: 'status', required: false })
  async findAll(@Query('page') page?: number, @Query('pageSize') pageSize?: number, @Query('userId') userId?: string, @Query('status') status?: string) {
    const { orders, total } = await this.ordersService.findAll(page, pageSize, userId, status);
    return { code: 200, data: orders, total, timestamp: Date.now() };
  }

  @Get('user/:userId') @ApiOperation({ summary: 'Get user orders' })
  async findByUser(@Param('userId') userId: string) { return { code: 200, data: await this.ordersService.findByUserId(userId), timestamp: Date.now() }; }

  @Get(':id') @ApiOperation({ summary: 'Get order by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) { return { code: 200, data: await this.ordersService.findById(id), timestamp: Date.now() }; }

  @Put(':id') @ApiOperation({ summary: 'Update order' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return { code: 200, data: await this.ordersService.update(id, dto), timestamp: Date.now() }; }

  @Patch(':id/cancel') @ApiOperation({ summary: 'Cancel order' })
  async cancel(@Param('id', ParseUUIDPipe) id: string) { return { code: 200, data: await this.ordersService.cancel(id), timestamp: Date.now() }; }

  @Delete(':id') @HttpCode(204) @ApiOperation({ summary: 'Delete order' })
  async remove(@Param('id', ParseUUIDPipe) id: string) { await this.ordersService.update(id, {}); }
}
