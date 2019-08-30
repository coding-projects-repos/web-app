import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  paranoid: true,
  timestamps: true,
  indexes: [
    { unique: true, fields: ['id'] },
    { unique: true, fields: ['username'] },
    { unique: true, fields: ['email'] },
    { unique: false, fields: ['updated_at'] },
  ],
})
export default class Users extends Model<Users> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Unique
  @Column({
    validate: {
      len: [4, 24],
    },
  })
  username: string;

  @Column
  password: string;

  @Unique
  @Column({
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
