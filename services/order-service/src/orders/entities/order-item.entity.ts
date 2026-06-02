import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'uuid' }) productId: string;
  @Column({ length: 255 }) productName: string;
  @Column({ type: 'int' }) quantity: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) price: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) subtotal: number;
  @ManyToOne(() => Order, order => order.items) @JoinColumn({ name: 'orderId' }) order: Order;
  @Column({ type: 'uuid' }) orderId: string;
}
