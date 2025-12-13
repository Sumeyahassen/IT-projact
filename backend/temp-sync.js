const { sequelize } = require('./models');

async function sync() {
  await sequelize.sync({ alter: true });
  console.log('✅ All tables synced (including product_prices)!');
  process.exit();
}

sync();
