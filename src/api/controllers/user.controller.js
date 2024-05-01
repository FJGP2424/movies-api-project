const User = require('../models/user.model');

const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const createdUser = await newUser.save();
    return res.json(createdUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const idMovie = req.body.id;
    console.log(idUser, idMovie);
    const modifyUser = await User.findByIdAndUpdate(
      idUser,
      { $push: { movie: idMovie } },
      { new: true }
    );
    return res.status(200).json(modifyUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const selectUser = async (req, res) => {
  const nameUser = req.query.name;
  const users = await User.find() //para filtrar, dentro del parentesis pondria { name: nameUser }
    .populate({ path: 'movie', select: 'name' }) // de esta forma accedemos directamente a la información.
  return res.status(200).json(users);
};

module.exports = { addUser, selectUser, updateUser };
