/* eslint-disable prettier/prettier */
import { ProductSchema } from './products.model';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductsModule {}
