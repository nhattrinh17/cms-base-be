import { Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';

@Table({
  tableName: 'Users',
  timestamps: true,
  indexes: [
    { name: 'email_index', fields: ['email'], unique: true },
    { name: 'username_index', fields: ['username'], unique: true },
    { name: 'phone_index', fields: ['phone'], unique: true },
  ],
})
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  @Column({ type: DataType.STRING })
  avatar: string;

  @Column({ type: DataType.STRING })
  gender: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  confirmAccount: boolean;

  @Column({ type: DataType.BOOLEAN })
  isDeleted: boolean;

  @Column({ type: DataType.DATE })
  deletedAt: Date;
}

const addConditionNotDelete = (options: any) => {
  if (!options.where) {
    options.where = {};
  }
  options.where.isDeleted = { $ne: true };
};

// User.addHook('beforeFind', addConditionNotDelete);
// User.addHook('beforeCount', addConditionNotDelete);
