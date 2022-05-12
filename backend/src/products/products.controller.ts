/* eslint-disable prettier/prettier */
import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('produse')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productsService.getProduct(id);
    return product;
  }

  @Post()
  async addProduct(
    @Body('name') name: string,
    @Body('code') code: number,
    @Body('weight') weight: string,
    @Body('price') price: number,
    @Body('color') color: string,
    @Body('isDeleted') isDeleted: boolean,
  ) {
    const productId = await this.productsService.addProduct(
      name,
      code,
      weight,
      price,
      color,
      isDeleted,
    );
    return {
      id: productId,
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('name') name: string,
    @Body('code') code: number,
    @Body('weight') weight: string,
    @Body('price') price: number,
    @Body('color') color: string,
    @Body('isDeleted') isDeleted: boolean,
  ) {
    await this.productsService.updateProduct(
      productId,
      name,
      code,
      weight,
      price,
      color,
      isDeleted,
    );
    return null;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    await this.productsService.deleteProduct(productId);
    return null;
  }
}
