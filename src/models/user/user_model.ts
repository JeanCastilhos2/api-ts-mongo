import { Schema, model, Document } from 'mongoose';
import { mongoose } from '../../config/db/database';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  }
}, {
  timestamps: true, // Isso substitui o timestamps: true do Sequelize
  collection: 'users' // Equivalente ao tableName
});

// Criamos um modelo TypeScript que mantém a mesma interface que antes
const User = model<IUser>('User', UserSchema);

export default User;
