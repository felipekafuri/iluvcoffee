import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

class MockCoffeesService {}

//useClass example
// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// useFactory example
@Injectable()
export class CoffeeBrandsFactory {
  async create() {
    // do something
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    // {
    //   provide: CoffeesService,
    //   useValue: new MockCoffeesService(),
    // },
    // {
    //   provide: COFFEE_BRANDS,
    //   useValue: ['buddy brew', 'nescafe'],
    // },
    {
      provide: COFFEE_BRANDS,
      useFactory: async (brandsFactory: CoffeeBrandsFactory) =>
        await brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
    },
    // {
    //   provide: CoffeesService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
