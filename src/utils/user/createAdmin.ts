import User from "../../models/user/user_model";
import { createUserService } from "../../service/user/user_service";

export const createAdminUser = async () => {
    const adminData = {
        name: "admin",
        email: "admin@admin.com",
        password: "$admin",
    };

    try {
        const existingAdmin = await User.findOne({ email: adminData.email });
        if (!existingAdmin) {
            await createUserService(adminData);
            console.log('Usuario Admin criado...');
        } else {
            console.log('Usuario Admin ativo...');
        }
    } catch (error) {
        console.error("Erro ao verificar/criar o usuário admin:", error);
    }
}

