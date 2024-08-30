import api from "../api";

const prefix = "status";

export const serverStatus = () => api.get(`${prefix}/server-status`);
