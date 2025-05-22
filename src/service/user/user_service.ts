import User from "../../models/user/user_model";
import { validateEmail, validateName, validatePassword, validateRole } from "../../utils/validators/validators";
import { Types } from 'mongoose';

// Serviço para criação de um usuário
export const createUserService = async (data: { name: string; email: string; password: string }) => {
  const { name, email, password } = data;

  // Validações (mantidas iguais)
  if (!validateName(name)) {
    throw new Error("O nome é obrigatório e não pode estar vazio.");
  }

  if (!validateEmail(email)) {
    throw new Error("Um e-mail válido é obrigatório.");
  }

  if (!validatePassword(password)) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }

  // Verifica se o e-mail já existe - sintaxe Mongoose
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("E-mail já está em uso.");
  }

  // Cria o usuário - sintaxe Mongoose
  const newUser = new User({ name, email, password });
  return await newUser.save();
};

// Serviço para buscar todos os usuários
export const findAllUsersService = async () => {
  return await User.find({}).lean(); // .lean() retorna objetos JS simples
};

// Serviço para buscar um usuário por ID
export const findUserByIdService = async (id: string) => {
  if (!id || !Types.ObjectId.isValid(id)) {
    throw new Error("ID é obrigatório e deve ser um ObjectId válido.");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
};

export const findUserByEmailService = async (email: string) => {
  if (!email) {
    throw new Error("Email é obrigatório.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
};

// Serviço para atualizar um usuário
export const updateUserService = async (id: string, data: Partial<{ name: string; email: string; password: string; role: string }>) => {
  const { name, email, password, role } = data;

  if (!id || !Types.ObjectId.isValid(id)) {
    throw new Error("ID é obrigatório e deve ser um ObjectId válido.");
  }

  // Validações (mantidas iguais)
  if (name && !validateName(name)) {
    throw new Error("O nome não pode estar vazio.");
  }

  if (email && !validateEmail(email)) {
    throw new Error("E-mail inválido.");
  }

  if (password && !validatePassword(password)) {
    throw new Error("Password inválido.");
  }

  if (role && !validateRole(role)) {
    throw new Error("Role inválido.");
  }

  // Atualiza o usuário - sintaxe Mongoose
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true } // Retorna o documento atualizado
  );

  if (!updatedUser) {
    throw new Error("Usuário não encontrado.");
  }

  return updatedUser;
};

// Serviço para deletar um usuário
export const deleteUserService = async (id: string) => {
  if (!id || !Types.ObjectId.isValid(id)) {
    throw new Error("ID é obrigatório e deve ser um ObjectId válido.");
  }

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new Error("Usuário não encontrado.");
  }

  return deletedUser;
};