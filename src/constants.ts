
const DEBUG = true

const baseURL =DEBUG ?  "http://localhost:8000/api"  : 'https://windam-backend.onrender.com/api'
const baseWsUrl = DEBUG ? "ws://localhost:8000/ws" : "ws://windam-backend.onrender.com"

export {baseURL, baseWsUrl}