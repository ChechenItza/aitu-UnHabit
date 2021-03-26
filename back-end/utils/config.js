require('dotenv').config()

let PORT = process.env.PORT || 3001
let HTTP_PORT = process.env.PORT || 3001
let MONGODB_URI = process.env.MONGODB_URI

let TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = { 
  PORT, 
  HTTP_PORT,
  MONGODB_URI,
  TOKEN_SECRET,
}