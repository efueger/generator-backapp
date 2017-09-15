// on macOS mongo address in defined by MONGO_PORT_27017_TCP_ADR
// and on linux based system MONGODB_PORT_27017_TCP_ADDR
let mongoHost = process.env.MONGO_HOST

if (process.env.MONGODB_PORT_27017_TCP_ADDR) {
  mongoHost = process.env.MONGODB_PORT_27017_TCP_ADDR
}

if (process.env.MONGO_PORT_27017_TCP_ADDR) {
  mongoHost = process.env.MONGO_PORT_27017_TCP_ADDR
}

export default mongoHost
