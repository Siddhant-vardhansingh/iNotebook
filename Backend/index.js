const connecttoMongo = require('./db')
const express = require('express')
const port = process.env.PORT || 8001
connecttoMongo()
const app = express()


app.listen(port, ()=>{
    console.log(`App started on port ${port}`)
})

// Middleware

app.use(express.json())
// Listeners
app.use('/api/auth', require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))