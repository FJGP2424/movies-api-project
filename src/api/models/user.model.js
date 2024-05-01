const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    age: { type: Number }, 
    movie: [{type: Schema.ObjectId, ref: 'movie'}] //Este 'movie' hace referencia a la colección y establece el vinculo con la otra colección "movie-user".
  },
  {
    collection: 'user',
  }
);
const User = mongoose.model('user', userSchema);
module.exports = User;
