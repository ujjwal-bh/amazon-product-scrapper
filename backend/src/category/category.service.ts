import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(
       private readonly prismaService: PrismaService
      ) {}
    
      async getCategories() {
        return await this.prismaService.category.findMany({include: {products: true}})
      }


      async getCategory(name: string){
        return await this.prismaService.category.findUnique({where: {name}});
      }
      async createCategory(data: CategoryDto){
        return await this.prismaService.category.create({
          data,
          include: {
            products: false
          }
        });

      }
    
     
}
