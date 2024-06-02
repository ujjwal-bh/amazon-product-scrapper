import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { UrlsDto } from './scrapper.dto';
import { ProductService } from 'src/product/product.service';

@Controller('api/v1/scrapper')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService, private readonly productService: ProductService) {}

  @Post('product')
  async scrapeProducts(@Body() body: UrlsDto): Promise<any> {
    return await this.scrapperService.getProducts(body.urls);
  }
  @Get("")
  async getAllFromDb(){
    return await this.productService.getProducts();
  }
}
