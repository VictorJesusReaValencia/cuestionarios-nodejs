import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';
import Question from './Question';

class AnswerOption extends Model {
  public declare id: number;
  public declare option: string;
  public declare correct: boolean;
  public declare questionId: number;
}

AnswerOption.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  option: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  correct: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'AnswerOption',
  tableName: 'answerOptions',
  timestamps: true,
});

AnswerOption.belongsTo(Question, { foreignKey: 'questionId' });
Question.hasMany(AnswerOption, { foreignKey: 'questionId' });

export default AnswerOption;
