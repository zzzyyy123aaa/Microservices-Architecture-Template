import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post() @ApiOperation({ summary: 'Create product' })
  async create(@Body() dto: any) { return { code: 201, data: await this.productsService.create(dto), timestamp: Date.now() }; }

  @Get() @ApiOperation({ summary: 'Get all products' })
  async findAll(@Query() query: any) {
    const { products, total } = await this.productsService.findAll(query);
    return { code: 200, data: products, total, timestamp: Date.now() };
  }

  @Get('categories') @ApiOperation({ summary: 'Get categories' })
  async getCategories() { return { code: 200, data: await this.productsService.findCategories(), timestamp: Date.now() }; }

  @Get('search') @ApiOperation({ summary: 'Search products' })
  async search(@Query('keyword') keyword: string) { return { code: 200, data: await this.productsService.search(keyword), timestamp: Date.now() }; }

  @Get(':id') @ApiOperation({ summary: 'Get product by ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) { return { code: 200, data: await this.productsService.findById(id), timestamp: Date.now() }; }

  @Put(':id') @ApiOperation({ summary: 'Update product' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return { code: 200, data: await this.productsService.update(id, dto), timestamp: Date.now() }; }

  @Patch(':id/stock') @ApiOperation({ summary: 'Update stock' })
  async updateStock(@Param('id', ParseUUIDPipe) id: string, @Body('quantity') quantity: number) { return { code: 200, data: await this.productsService.updateStock(id, quantity), timestamp: Date.now() }; }

  @Delete(':id') @HttpCode(204) @ApiOperation({ summary: 'Delete product' })
  async remove(@Param('id', ParseUUIDPipe) id: string) { await this.productsService.delete(id); }
}
