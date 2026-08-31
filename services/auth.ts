import { api } from "./api";

export const login = async (email: string, senha: string): Promise<string | null> => {
    try {
        const resposta = await api.post("/auth/customer/login", {
            email: email,
            password: senha
        });
    
        if (resposta.status !== 200) {
            return null
        }
        
        return resposta.data.token as string ?? null
    } catch(error) {
        console.error(error)
        return null
    }
}