import { Op } from 'sequelize';

export * from './user.model';
export * from './category-type.model';
export * from './category.model';
export * from './blog.model';
export * from './product.model';
export * from './review.model';
export * from './permission-action.model';
export * from './permission-service.model';
export * from './permission-category.model';
export * from './group.model';

export const addConditionNotDelete = (options: any) => {
  if (!options.where) {
    options.where = {};
  }
  options.where.isDeleted = { [Op.ne]: true };
};
