/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addProduct(
    name: string,
    code: number,
    weight: string,
    price: number,
    color: string,
    isDeleted: boolean,
  ) {
    const newProduct = new this.productModel({
      name,
      code,
      weight,
      price,
      color,
      isDeleted,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      name: prod.name,
      code: prod.code,
      weight: prod.weight,
      price: prod.price,
      color: prod.color,
      isDeleted: prod.isDeleted,
    }));
  }

  async getProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      name: product.name,
      code: product.code,
      weight: product.weight,
      price: product.price,
      color: product.color,
      isDeleted: product.isDeleted,
    };
  }

  async updateProduct(
    productId: string,
    name: string,
    code: number,
    weight: string,
    price: number,
    color: string,
    isDeleted: boolean,
  ) {
    let updatedProduct;
    try {
      updatedProduct = await this.findProduct(productId);
    } catch (err) {
      throw new NotFoundException('Cannot find product in the collection');
    }

    if (!updatedProduct) {
    }
    if (name) {
      updatedProduct.name = name;
    }
    if (code) {
      updatedProduct.code = code;
    }
    if (weight) {
      updatedProduct.weight = weight;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (color) {
      updatedProduct.color = color;
    }
    if (isDeleted) {
      updatedProduct.isDeleted = isDeleted;
    }
    updatedProduct.save();
  }

  async deleteProduct(productId: string) {
    await this.productModel.deleteOne({ _id: productId }).exec();
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (err) {
      throw new NotFoundException('Cannot find product in the collection');
    }
    if (!product) {
      throw new NotFoundException('Cannot find product in the collection');
    }
    return product;
  }
}
