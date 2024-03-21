import { Op } from 'sequelize';
import { BeforeCount, BeforeFind, BeforeSave, Column, HookOptions, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { addConditionNotDelete } from '.';

@Table({
  tableName: 'CategoryTypes',
  timestamps: true,
  indexes: [{ name: 'name_index', fields: ['name'] }],
})
export class CategoryType extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.STRING,
    defaultValue: Status.Active,
  })
  status: string;

  @Column({ type: DataType.STRING })
  kind: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;

  @Column({ type: DataType.DATE })
  deletedAt: Date;

  @BeforeFind
  @BeforeCount
  static async BeforeFindHook(options: any) {
    addConditionNotDelete(options);
  }
}
