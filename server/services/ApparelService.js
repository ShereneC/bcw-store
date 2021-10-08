import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

//NOTE holds the model
const _model = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  manufacturer: { type: ObjectId, ref: "manufacturer", required: true, default: null }
})


//NOTE expose the repository
export default class ApparelService {
  get repository() {
    return mongoose.model("apparel", _model)
  }
}