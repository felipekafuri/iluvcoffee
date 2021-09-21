export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
  },
});
