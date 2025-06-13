import api from "./api";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
}
