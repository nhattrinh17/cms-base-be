import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { CategoryTypeModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'Categorys',
  timestamps: true,
  indexes: [{ name: 'name_index', fields: ['name'] }],
})
export class CategoryModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  @ForeignKey(() => CategoryTypeModel)
  @Column
  categoryTypeId: number;

  @BelongsTo(() => CategoryTypeModel)
  categoryType: CategoryTypeModel;

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
