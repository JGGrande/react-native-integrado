import axios from "axios";

export const api = axios.create({
    baseURL: "https://eazy-ticket-backend.infra.bytework.app.br",
    timeout: 60_000
});