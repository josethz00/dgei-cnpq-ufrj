import express from 'express'
import { Readable } from 'stream'
import readline from 'readline'
import fs from 'fs'
import { News } from './entities/news.js'

const routes = express.Router()

// Rota raíz para testar se o sistema está funcionando
routes.get('/', (request, response) => {
  return response.json({ message: 'Server is up and running!' })
})

// Rota para listar todas as notícias
routes.get('/news', async (request, response) => {
  const allNews = await News.find()
  return response.json(allNews)
})

// Rota para buscar uma determinada notícia, por título, descrição, tema ou índice
routes.get('/news/:searchTerm', async (request, response) => {
  const { searchTerm } = request.params
  const news = await News.findOne().or([
    { title: searchTerm },
    { description: searchTerm },
    { theme: searchTerm },
    { index: searchTerm }
  ])
  return response.json(news)
})

// Rota para cadastrar UMA nova notícia
routes.post('/news', async (request, response) => {
  const { 
    index, 
    link, 
    date, 
    title, 
    description, 
    theme, 
    region, 
    state, 
    city 
  } = request.body

  await News.create({
    index, 
    link, 
    date, 
    title, 
    description, 
    theme, 
    region, 
    state, 
    city
  })
  return response.status(201).send('News registered')
})

// Rota para cadastrar uma série de notícias estaticamente
routes.post('/news/static', async (request, response) => {
  const csvBuffer = await fs.promises.readFile('static/Cópia de Preencher - Brasil (MD).tsv');

  const readableFile = new Readable()
  readableFile.push(csvBuffer)
  readableFile.push(null)

  const news = readline.createInterface({
    input: readableFile,
  })

  let lineCounter = 0
  const newsArray = []

  for await (const line of news) {
    if (lineCounter == 0) {
      lineCounter++
      continue
    }

    const splittedLine = line.split('\t')
    newsArray.push({
      index: splittedLine[0],
      link: splittedLine[1],
      date: splittedLine[2],
      title: splittedLine[3],
      description: splittedLine[4],
      theme: splittedLine[5],
      region: splittedLine[6],
      state: splittedLine[7],
      city: splittedLine[8]
    })

    lineCounter++
  }

  await News.insertMany(newsArray)
  
  return response.status(201).send('News read from file and inserted in the database')
})

export { routes }