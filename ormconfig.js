module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'iluvcoffee',
  entities: ['dist/**/*.entity.js'],
  migration: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
