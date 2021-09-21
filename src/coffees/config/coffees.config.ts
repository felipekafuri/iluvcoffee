import { registerAs } from '@nestjs/config';

// * let us register namespace config
export default registerAs('coffees', () => ({
  foo: 'bar',
}));

// Todo: todo this
// ! this is not working
