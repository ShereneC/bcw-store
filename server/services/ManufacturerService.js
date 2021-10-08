import mongoose from 'mongoose'
const Schema = mongoose.Schema
//NOTE holds the model
const _model = new Schema({
  name: { type: String, required: true },
})


//NOTE expose the repository
export default class ManufacturerService {
  get repository() {
    return mongoose.model("manufacturer", _model)
  }
}