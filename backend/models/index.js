require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,       // This tells Sequelize to use SSL
      rejectUnauthorized: false // Allows Render certs
    }
  }
});


// Define User model
const User = sequelize.define('User', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'farmer', 'agent', 'extension'),
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

// Define ProductPrice model
const ProductPrice = sequelize.define('ProductPrice', {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price_per_kg: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'product_prices',
  timestamps: true,
});

// Define Notification model
const Notification = sequelize.define('Notification', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true,  // null = all regions
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'notifications',
  timestamps: true,
});

// Associations
ProductPrice.belongsTo(User, { foreignKey: 'updated_by', as: 'agent' });
User.hasMany(ProductPrice, { foreignKey: 'updated_by', as: 'prices' });

Notification.belongsTo(User, { foreignKey: 'created_by', as: 'extension' });
User.hasMany(Notification, { foreignKey: 'created_by', as: 'notifications' });

//
const LocalProduct = sequelize.define('LocalProduct', {
  product_name: DataTypes.STRING,
  price_per_kg: DataTypes.FLOAT,
  region: DataTypes.STRING,
  added_by: DataTypes.INTEGER,
});

LocalProduct.belongsTo(User, { foreignKey: 'added_by', as: 'farmer' });
User.hasMany(LocalProduct, { foreignKey: 'added_by', as: 'localProducts' });
// Farmer Question
const FarmerQuestion = sequelize.define('FarmerQuestion', {
  question: { type: DataTypes.TEXT, allowNull: false },
  answer: { type: DataTypes.TEXT, allowNull: true },
  answered: { type: DataTypes.BOOLEAN, defaultValue: false },
  region: DataTypes.STRING,
  asked_by: DataTypes.INTEGER,
});

FarmerQuestion.belongsTo(User, { foreignKey: 'asked_by', as: 'farmer' });
User.hasMany(FarmerQuestion, { foreignKey: 'asked_by', as: 'questions' });
// Export
module.exports = {
  sequelize,
  User,
  ProductPrice,
  Notification,
  LocalProduct,
  FarmerQuestion,
};