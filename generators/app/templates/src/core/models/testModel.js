import mongoose from 'mongoose'
import createdAt from './utils/createdAt'

const Schema = mongoose.Schema

const schema = new Schema({
  _createdAt: { type: Date, select: false },
  name: String,
  surname: { type: String, unique: true },
  password: { type: String, required: true, select: false },
})

// Add date
schema.pre('save', createdAt)

// Select all fields
schema.query.selectAll = function () {
  return this.select('+password +_createdAt')
}

export default mongoose.model('testModel', schema)
