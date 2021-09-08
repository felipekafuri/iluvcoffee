import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Cappuccino',
      brand: 'Superstar',
      flavors: ['vanilla', 'chocolate'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: number): Coffee {
    return this.coffees.find((coffee) => coffee.id === id);
  }

  create(createCoffeeDto: CreateCoffeeDto): Coffee {
    const coffee = {
      id: Math.random(),
      ...createCoffeeDto,
    };

    this.coffees.push(coffee);
    return coffee;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto): Coffee {
    const coffee = this.findOne(id);
    const newCoffee: Coffee = {
      ...coffee,
      ...updateCoffeeDto,
    };

    const findIndex = this.coffees.findIndex(
      (coffee) => coffee.id === Number(id),
    );

    this.coffees[findIndex] = newCoffee;
    return newCoffee;
  }

  delete(id: number): void {
    const index = this.coffees.findIndex((c) => c.id === +id);
    this.coffees.splice(index, 1);
  }
}
