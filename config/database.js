const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const env = dotenv.config().parsed

const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
      host: env.DB_HOST,
      port: env.DB_PORT,
      dialect: 'postgres',
    }
  );
//   console.log(env.DB_HOST)
//   console.log(env.DB_NAME)
//   console.log(env.DB_USER)
//   console.log(env.DB_PASSWORD)
  const Users = (sequelize, Sequelize.DataTypes);
  module.exports = {sequelize};