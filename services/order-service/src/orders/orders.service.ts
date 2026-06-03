import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}

  async create(dto: any) {
    const totalAmount = dto.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const items = dto.items.map((item: any) => ({ ...item, subtotal: item.price * item.quantity }));
    const order = this.orderRepo.create({ ...dto, totalAmount, items });
    return this.orderRepo.save(order);
  }

  async findAll(page?: number | string, pageSize?: number | string, userId?: string, status?: string) {
    const p = Math.max(1, Number(page) || 1);
    const ps = Math.max(1, Number(pageSize) || 10);
    const qb = this.orderRepo.createQueryBuilder('o').leftJoinAndSelect('o.items', 'items').orderBy('o.createdAt', 'DESC');
    if (userId) qb.andWhere('o.userId = :userId', { userId });
    if (status) qb.andWhere('o.status = :status', { status });
    const [orders, total] = await qb.skip((p - 1) * ps).take(ps).getManyAndCount();
    return { orders, total };
  }

  async findById(id: string) {
    const order = await this.orderRepo.findOne({ where: { id }, relations: ['items'] });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  async findByUserId(userId: string) { return this.orderRepo.find({ where: { userId }, relations: ['items'], order: { createdAt: 'DESC' } }); }

  async update(id: string, dto: any) { await this.orderRepo.update(id, dto); return this.findById(id); }

  async cancel(id: string) {
    const order = await this.findById(id);
    if (order.status !== OrderStatus.PENDING) throw new BadRequestException('Only pending orders can be cancelled');
    order.status = OrderStatus.CANCELLED;
    return this.orderRepo.save(order);
  }
}
