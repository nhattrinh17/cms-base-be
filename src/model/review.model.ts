import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { ProductModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'Reviews',
  timestamps: true,
  indexes: [
    { name: 'status_index', fields: ['status'] },
    { name: 'product_index', fields: ['productId'] },
  ],
})
export class ReviewModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  reviewerName: string;

  @Column({ type: DataType.STRING })
  reviewerEmail: string;

  @Column({ type: DataType.STRING })
  reviewerPhone: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  @Column({ type: DataType.TEXT })
  content: string;

  @Column({ type: DataType.INTEGER })
  starsCount: string;

  @Column({ type: DataType.TEXT })
  images: string;

  @ForeignKey(() => ProductModel)
  @Column
  productId: number;

  @BelongsTo(() => ProductModel)
  product: ProductModel;

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
