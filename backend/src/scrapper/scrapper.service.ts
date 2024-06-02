import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { ProductService } from 'src/product/product.service';
import puppeteer from 'puppeteer';
import { ProductDto } from 'src/product/product.dto';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScrapperService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly prismaService: PrismaService,
  ) {}
  async getProducts(urls: string[]) {
    let successfullProducts: Product[] = [];
    let failedUrls: string[] = [];

    for (const url of urls) {
      try {
        const product = await this.checkProduct(url);
        successfullProducts.push(product);
      } catch (error) {
        failedUrls.push(url);
      }
    }
    // const categoryIds = [
    //   ...new Set(successfullProducts.map((product) => product.categoryId)),
    // ];
    // const categoriesWithProducts = await this.prismaService.category.findMany({
    //   where: {
    //     id: { in: categoryIds },
    //   },
    //   include: {
    //     products: true,
    //   },
    // });

    // const filteredCategories = categoriesWithProducts.map((category) => ({
    //   category: {
    //     id: category.id,
    //     name: category.name,
    //     products: category.products.filter((product) =>
    //       successfullProducts.some(
    //         (successfullProduct) => successfullProduct.id === product.id,
    //       ),
    //     ),
    //   },
    // }));

    // return {
    //   failedUrls,
    //   data: filteredCategories,
    // };

    return {
      failedUrls,
      products: successfullProducts
    }
  }

  async checkProduct(url: string): Promise<Product> {
    const productExists = await this.productService.getProductByUrl(url);
    if (!productExists) {
      const { category, ...rest } = await this.scrapeUrl(url);
      return await this.createProduct({ ...rest, url }, category);
    } else {
      const lastUpdatedDate = new Date(productExists.updateAt);
      const currentDate = new Date();
      const lastUpdatedDays =
        (currentDate.getTime() - lastUpdatedDate.getTime()) /
        (1000 * 60 * 60 * 24);
      if (lastUpdatedDays > 7) {
        const { img, price, title } = await this.scrapeUrl(url);
        return await this.updateProduct({ img, url, title, price });
      } else return productExists;
    }
  }

  async scrapeUrl(url: string) {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.setViewport({
        width: 1920,
        height: 1280,
        deviceScaleFactor: 1,
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([page.waitForNavigation(), page.goto(url)]);
      const result = await page.$$eval('.a-aui_72554-c', (resultItems) => {
        return resultItems.map((resultItem) => {
          const img =
            resultItem.querySelector('#imgTagWrapperId')?.querySelector('img')
              ?.src || 'no-img';
          const categories = resultItem.querySelectorAll(
            '#wayfinding-breadcrumbs_feature_div ul li',
          );
          const category =
            categories[categories.length > 2 ? 2 : categories.length - 1]
              .querySelector('span')
              ?.textContent.trim() || 'Unknown';
          const title =
            resultItem.querySelector('#productTitle')?.textContent.trim() ||
            'title not found';
          const price =
            resultItem.querySelector('.a-price-whole')?.textContent || 'NA';
          return {
            //   url,
            img,
            title,
            price,
            category,
          };
        });
      });

      if (!result || result.length == 0)
        throw new NotFoundException('No data found');

      return result[0];

      // return result;
    } catch (error) {
      throw new HttpException('Could not scrape data.', 502);
    } finally {
      await browser.close();
    }
  }

  async createProduct(
    product: ProductDto,
    categoryName: string,
  ): Promise<Product> {
    try {
      let category = await this.categoryService.getCategory(categoryName);
      if (!category) {
        category = await this.categoryService.createCategory({
          name: categoryName,
        });
      }

      return await this.productService.createProduct(product, category.id);
    } catch (error) {}
  }

  async updateProduct(product: ProductDto): Promise<Product> {
    return await this.productService.updateProduct(product);
  }
}
