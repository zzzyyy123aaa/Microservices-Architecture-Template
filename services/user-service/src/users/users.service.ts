import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService) {}

  async create(dto: any) {
    const existing = await this.userRepo.findOne({ where: [{ username: dto.username }, { email: dto.email }] });
    if (existing) throw new ConflictException('Username or email already exists');
    const user = this.userRepo.create(dto);
    const saved = await this.userRepo.save(user) as unknown as User;
    const { password, ...result } = saved;
    return result;
  }

  async findAll(page?: number | string, pageSize?: number | string) {
    const p = Math.max(1, Number(page) || 1);
    const ps = Math.max(1, Number(pageSize) || 10);
    const [users, total] = await this.userRepo.findAndCount({ skip: (p - 1) * ps, take: ps, order: { createdAt: 'DESC' } });
    return { users: users.map(({ password, ...rest }) => rest), total };
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    const { password, ...result } = user;
    return result;
  }

  async login(dto: any) {
    const user = await this.userRepo.findOne({ where: [{ username: dto.username }, { email: dto.username }] });
    if (!user || !(await user.validatePassword(dto.password))) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwtService.sign({ sub: user.id, username: user.username, email: user.email, roles: user.roles });
    const { password, ...result } = user;
    return { user: result, token };
  }

  async update(id: string, dto: any) { await this.userRepo.update(id, dto); return this.findById(id); }
  async delete(id: string) { await this.userRepo.delete(id); }
}
