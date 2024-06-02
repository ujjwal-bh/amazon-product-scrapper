import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaServie: PrismaService) {}

  async getProducts() {
    return await this.prismaServie.product.findMany({
      include: { category: true },
    });
  }
  async getProductByUrl(url: string) {
    return await this.prismaServie.product.findUnique({
      where: { url },
      include: { category: true },
    });
  }

  async createProduct(product: ProductDto, categoryId: string) {
    return await this.prismaServie.product.create({
      data: { ...product, categoryId },
      include: { category: true },
    });
  }

  async updateProduct(product: ProductDto) {
    return await this.prismaServie.product.update({
      where: {
        url: product.url,
      },
      data: product,
      include: { category: true },
    });
  }
}
