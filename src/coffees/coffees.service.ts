import { Injectable } from '@nestjs/common';
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

  findOne(id: string): Coffee {
    return this.coffees.find((coffee) => coffee.id === +id);
  }

  create(coffee: Coffee): Coffee {
    this.coffees.push(coffee);
    return coffee;
  }

  update(id: string, coffee: Coffee): Coffee {
    const index = this.coffees.findIndex((c) => c.id === +id);
    this.coffees[index] = coffee;
    return coffee;
  }

  delete(id: string): void {
    const index = this.coffees.findIndex((c) => c.id === +id);
    this.coffees.splice(index, 1);
  }
}
