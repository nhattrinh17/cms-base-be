import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { CategoryModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'Products',
  timestamps: true,
  indexes: [
    { name: 'name_index', fields: ['name'] },
    { name: 'status_index', fields: ['status'] },
    { name: 'categoryId_index', fields: ['categoryId'] },
  ],
})
export class ProductModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  @Column({ type: DataType.TEXT })
  content: string;

  @Column({ type: DataType.INTEGER })
  price: number;

  @Column({ type: DataType.STRING })
  featuredImage: string;

  @Column({ type: DataType.TEXT })
  images: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.INTEGER })
  buyCount: number;

  @Column({ type: DataType.INTEGER })
  starsCount: number;

  @Column({ type: DataType.TEXT })
  code: string;

  @Column({ type: DataType.INTEGER, comment: 'Tính theo gam' })
  netWeight: number;

  @Column({ type: DataType.STRING })
  brand: string;

  @ForeignKey(() => CategoryModel)
  @Column
  categoryId: number;

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;

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
