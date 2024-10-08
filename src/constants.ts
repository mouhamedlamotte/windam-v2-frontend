import { env } from "process"

const DEBUG = env.NODE_ENV === "development"

const baseURL =DEBUG ?  "http://localhost:8000/api"  : 'https://windam-backend.onrender.com/api'
const baseWsUrl = DEBUG ? "ws://localhost:8000/ws" : "wss://windam-backend.onrender.com/ws"

export {baseURL, baseWsUrl}