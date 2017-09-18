import mongoose from 'mongoose'
import createdAt from './utils/createdAt'

const Schema = mongoose.Schema
//const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new Schema({
  _createdAt: Date,
  <%= FIELDS %>
})

schema.pre('save', createdAt)

export default mongoose.model('<%= MODEL_NAME %>', schema)
