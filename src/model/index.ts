import { Op } from 'sequelize';

export * from './user.model';
export * from './category-type.model';
export * from './category.model';

export const addConditionNotDelete = (options: any) => {
  if (!options.where) {
    options.where = {};
  }
  options.where.isDeleted = { [Op.ne]: true };
};
