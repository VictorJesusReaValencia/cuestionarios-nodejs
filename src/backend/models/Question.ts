import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';
import User from './User';

class Question extends Model {
  public declare id: number;
  public declare question: string;
  public declare creatorUserId: number;
}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  creatorUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Question',
  tableName: 'questions',
  timestamps: true,
});

Question.belongsTo(User, { foreignKey: 'creatorUserId' });
User.hasMany(Question, { foreignKey: 'creatorUserId' });

export default Question;
