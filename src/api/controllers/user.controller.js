const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { validateEmailDB, validatePassword } = require('../../utils/validator');
const { generateToken } = require("../../utils/jwt")

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

//Registro de un nuevo usuario
const register = async (req, res) => {
  try {

    // creo el documento del usuario
    const userDoc = new User(req.body);
    console.log(req.body);

    //validaciones
    //1.- El usuario no exista. (email)
    const valEmail = await validateEmailDB(req.body.email);
    console.log(valEmail); // devuelve null si no se encuentra  en la BD
    if (!valEmail) {

      // valEmail === null
      //2.- La contraseña cumpla el patron requerido (regex)
      const valPassword = validatePassword(req.body.password);
      if (valPassword) {
        
        //3.- Encriptar la contraseña  antes de registrarme  HASH
        userDoc.password = bcrypt.hashSync(userDoc.password, 10);
        const createdUser = await userDoc.save();
        return res.status(200).json({ success: true, data: createdUser });
      } else {
        return res.status(200).json({
          success: false,
          message: 'La contraseña no cumple con el patron indicado',
        });
      }
    }
    return res
      .status(200)
      .json({ success: false, message: 'Email ya registrado' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//Login de un usuario a nuestra base de datos
const login = async (req, res) => {
  try {
    const userBody = req.body;
    const userDB = await validateEmailDB(userBody.email)
    if (!userDB) {
      return res.status(200).json({ succe: false, message: "Email no registrado" })
    }
    if (!bcrypt.compareSync(userBody.password, userDB.password)) {
      return res.status(200).json({ succes: true, message: "Contraseña no válida" })
    }
    //generación del token y ejecución.
    const token = generateToken({
      name: userDB.name,
      email: userDB.email,
      _id: userDB._id,
    })
    return res.status(200).json({ success: true, token: token })

  } catch (error) {
    return res.status(500).json(error);
  }
}

const modifyProfile = async (req, res) => {
  console.log("funcion de modificar")
  console.log(req.userProfile); // es el usuario con los datos correspondiente al token
  const newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10) //encriptar contraseña
  newUser._id = req.userProfile._id
  console.log(newUser)
  const updateUser = await User.findByIdAndUpdate(req.userProfile._id, newUser, { new: true })
  return res.status(200).json({ data: updateUser })
}

module.exports = { register, login, modifyProfile };
module.exports = { addUser, selectUser, updateUser, login };
