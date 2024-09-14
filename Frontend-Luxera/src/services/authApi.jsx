import axiosInstance from "@/api/axios";

export const csrfToken = async () => {
  await axiosInstance.get("/sanctum/csrf-cookie", {
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });
};

export const ApigetUser = async () => {
  const response = await axiosInstance.get("/user");
  return response;
};

export const ApiLogin = async (credentials) => {
  if (localStorage.getItem("AuthToken")) return;
  const response = await axiosInstance.post("/login", credentials);
  return response;
};

export const ApiRegister = async (credentials) => {
  if (localStorage.getItem("AuthToken")) return;
  const response = await axiosInstance.post("/register", credentials);
  return response;
};

export const ApiProfile = async (credentials) => {
  if (!localStorage.getItem("AuthToken")) return;
  const response = await axiosInstance.post("/profile/auth", credentials, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const ApiUpdatePassword = async (credentials) => {
  if (!localStorage.getItem("AuthToken")) return;
  const response = await axiosInstance.post("/password/auth", credentials);
  return response;
};

export const ApiLogout = async () => {
  const response = await axiosInstance.post("/logout");
  return response;
};
