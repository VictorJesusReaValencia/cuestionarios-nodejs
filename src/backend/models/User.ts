import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

class User extends Model {
  public declare id: number;
  public declare username: string;
  public declare password: string;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}


User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255), 
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users', 
  timestamps: true,
});

export default User;
