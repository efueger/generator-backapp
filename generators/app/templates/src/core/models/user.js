import mongoose from 'mongoose'
import createdAt from './utils/createdAt'

const Schema = mongoose.Schema

const schema = new Schema({
  _createdAt: { type: Date, select: false },
  email: { type: String, required: true, unique: true },
  name: { type: String, default: false },
  surname: { type: String },
  password: { type: String, required: true, select: false },
})

schema.query.selectAll = function () {
  return this.select('+password +_createdAt')
}

schema.pre('save', createdAt)

export default mongoose.model('User', schema)
