import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { CategoryModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'Blogs',
  timestamps: true,
  indexes: [
    { name: 'title_index', fields: ['title'] },
    { name: 'status_index', fields: ['status'] },
  ],
})
export class BlogModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  @Column({ type: DataType.TEXT })
  content: string;

  // @Column({ type: DataType.TEXT,  })
  // auth: string;

  @Column({ type: DataType.STRING })
  publicationDate: string;

  @Column({ type: DataType.STRING })
  featuredImage: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.INTEGER })
  viewCount: string;

  @Column({ type: DataType.INTEGER })
  likeCount: string;

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
