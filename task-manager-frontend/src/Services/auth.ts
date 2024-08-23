import api from "./api";

export const register = (name: string, email: string, password: string) => {
    return api.post("/auth/register", { name, email, password });
};

export const login = (email: string, password: string) => {
    return api.post("/auth/login", { email, password });
};
