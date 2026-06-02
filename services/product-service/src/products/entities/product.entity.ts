import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ length: 255 }) name: string;
  @Column({ type: 'text' }) description: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) price: number;
  @Column({ type: 'int', default: 0 }) stock: number;
  @Column({ length: 100 }) category: string;
  @Column('simple-array', { nullable: true }) images: string[];
  @Column({ default: true }) isActive: boolean;
  @Column({ type: 'float', default: 0 }) rating: number;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
