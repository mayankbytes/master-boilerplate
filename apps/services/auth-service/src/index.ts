// import log from "@mb/logger"
import createServer from "./server"

const port = process.env.PORT || 3006
const server = createServer()

server.listen(port, () => {
//   log(`api running on ${port}`)
})
