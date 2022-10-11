import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import * as M from '../models/index.model';
import { logger } from '@utils/logger';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

for (const key in M) {
  if (key === 'sequelize' || key === 'Sequelize') continue;
  if (Object.prototype.hasOwnProperty.call(M, key)) {
    if (!M[key].initModel) continue;
    M[key].initModel(sequelize);
  }
}

for (const key in M) {
  if (key === 'sequelize' || key === 'Sequelize') continue;
  if (Object.prototype.hasOwnProperty.call(M, key)) {
    if (!M[key].associate) continue;
    M[key].associate(M);
  }
}

export { sequelize, Sequelize };
export * from '../models/index.model';
