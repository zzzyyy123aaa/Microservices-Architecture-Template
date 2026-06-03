import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  async create(dto: any) { return this.productRepo.save(this.productRepo.create(dto)); }

  async findAll(query: any) {
    const { keyword, category, minPrice, maxPrice, page, pageSize, sortBy = 'createdAt', sortOrder = 'DESC' } = query;
    const p = Math.max(1, Number(page) || 1);
    const ps = Math.max(1, Number(pageSize) || 10);
    const qb = this.productRepo.createQueryBuilder('p').where('p.isActive = :active', { active: true });
    if (keyword) qb.andWhere('(p.name LIKE :kw OR p.description LIKE :kw)', { kw: `%${keyword}%` });
    if (category) qb.andWhere('p.category = :cat', { cat: category });
    if (minPrice) qb.andWhere('p.price >= :min', { min: minPrice });
    if (maxPrice) qb.andWhere('p.price <= :max', { max: maxPrice });
    qb.orderBy(`p.${sortBy}`, sortOrder);
    const [products, total] = await qb.skip((p - 1) * ps).take(ps).getManyAndCount();
    return { products, total };
  }

  async findById(id: string) {
    const product = await this.productRepo.findOne({ where: { id, isActive: true } });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async findByCategory(category: string) { return this.productRepo.find({ where: { category, isActive: true } }); }
  async findCategories() { return this.productRepo.createQueryBuilder('p').select('DISTINCT p.category', 'category').getRawMany(); }
  async update(id: string, dto: any) { await this.productRepo.update(id, dto); return this.findById(id); }
  async updateStock(id: string, quantity: number) { await this.productRepo.increment({ id }, 'stock', quantity); return this.findById(id); }
  async delete(id: string) { await this.productRepo.update(id, { isActive: false }); }
  async search(keyword: string) { return this.productRepo.find({ where: [{ name: Like(`%${keyword}%`) }, { description: Like(`%${keyword}%`) }] }); }
}
