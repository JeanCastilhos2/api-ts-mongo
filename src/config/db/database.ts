import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Configuração da conexão com MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI!;

// Função de conexão modificada para MongoDB
const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conexão com o MongoDB Atlas estabelecida com sucesso.");
    
    // Não precisamos de sync no MongoDB da mesma forma que no Sequelize
    console.log("Banco de dados MongoDB pronto para uso.");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB Atlas:", error);
    process.exit(1);
  }
};

// Exportamos o mongoose para ser usado nos modelos
export { mongoose, connectDatabase };