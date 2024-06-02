import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './product.dto';

// Define a mock product for testing
const mockProduct = { id: 1, name: 'Test Product', url: 'test-product', price: 100, categoryId: '1', category: { id: 1, name: 'Test Category' } };

// Create a mock PrismaService with Jest mocks
const mockPrismaService = {
  product: {
    findMany: jest.fn().mockResolvedValue([mockProduct]),
    findUnique: jest.fn().mockResolvedValue(mockProduct),
    create: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
  },
};

describe('ProductService', () => {
  let service: ProductService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const result = await service.getProducts();
      expect(result).toEqual([mockProduct]);
      expect(prismaService.product.findMany).toHaveBeenCalled();
      expect(prismaService.product.findMany).toHaveBeenCalledWith({ include: { category: true } });
    });
  });

  describe('getProductByUrl', () => {
    it('should return a product', async () => {
      const result = await service.getProductByUrl('test-product');
      expect(result).toEqual(mockProduct);
      expect(prismaService.product.findUnique).toHaveBeenCalled();
      expect(prismaService.product.findUnique).toHaveBeenCalledWith({
        where: { url: 'test-product' },
        include: { category: true },
      });
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const productDto: ProductDto = { "title": 'Test Product', img: "random url", url: Math.random() * 1000 + "link", price: "100" };
      const result = await service.createProduct(productDto, '1');
      expect(result).toEqual(mockProduct);
      expect(prismaService.product.create).toHaveBeenCalled();
      expect(prismaService.product.create).toHaveBeenCalledWith({
        data: { ...productDto, categoryId: '1' },
        include: { category: true },
      });
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const productDto: ProductDto = { title: 'Updated Product', img: "test-url", url: Math.random() * 1000 + "link", price: "150" };
      const result = await service.updateProduct(productDto);
      expect(result).toEqual(mockProduct);
      expect(prismaService.product.update).toHaveBeenCalled();
      expect(prismaService.product.update).toHaveBeenCalledWith({
        where: { url: productDto.url },
        data: productDto,
        include: { category: true },
      });
    });
  });
});
