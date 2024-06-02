import { Module } from '@nestjs/common';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';
import { ProductService } from 'src/product/product.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService, ProductService, CategoryService]
})
export class ScrapperModule {}
