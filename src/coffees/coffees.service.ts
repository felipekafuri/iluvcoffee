import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return await this.coffeeRepository.find();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });

    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffee = this.coffeeRepository.create(createCoffeeDto);

    return await this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const coffee = await this.coffeeRepository.preload({
      id: id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async delete(id: number): Promise<Coffee> {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
