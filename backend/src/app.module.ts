import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapperModule } from './scrapper/scrapper.module';
import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './exception-filter/custom-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ScrapperModule,
    PrismaModule],
  controllers: [AppController],
  providers: [AppService, ProductService, CategoryService, {
    provide: APP_FILTER,
    useClass: CustomExceptionFilter,
  },],
})
export class AppModule {}
