import mongoose from 'mongoose'

const NewsSchema = new mongoose.Schema({
  index: {
    type: Number,
  },
  link: {
    type: String,
  },
  date: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  theme: {
    type: String,
  },
  region: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  }
})

export const News = mongoose.model('News', NewsSchema, 'News')