import mongoose from "mongoose"

// said he needed these things for his mongoose/atlas configuation, and we may want them.
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.connection.on('error', err => {
//   console.error('[DATABASE ERROR]:', err)
// })

const connectionString = process.env.connectionString || "mongodb+srv://Student:SuperSecret123@classroom.qiutj.mongodb.net/BCWStore?retryWrites=true&w=majority"

export default class DbContext {
  static async connect() {
    try {
      let status = await mongoose.connect(connectionString)
      console.log("Connected to DB")
      return status
    } catch (error) {
      console.log(error)
    }
  }
}