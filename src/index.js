const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/User')
const blogRouter = require('./routers/Blog')

const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(blogRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})