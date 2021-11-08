import express from 'express'
import mongoose from 'mongoose'
import { routes } from './routes.js'
import cors from 'cors'

// substituir com a URL e dados do seu banco de dados
// lembrar de mudar a senha e o nome do banco
mongoose.connect('mongodb+srv://<seu-usuario-aqui>:<sua-senha-aqui>@devcluster.u6g0p.mongodb.net/<seu-banco-de-dados-aqui>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB')
}).catch((err) => {
  console.log('MongoDB connection error: ' + err)
})

const app = express()
app.use(express.json())
app.use(routes)
app.use(cors())

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333')
})