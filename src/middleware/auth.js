const { verifyToken } = require("../utils/jwt");
const User = require("../api/models/user.model")

const isAuth = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(400).json({ message: "No hay token" })
        }
        const token = auth.split(" ")[1];
        const tokenVerified = verifyToken(token)
        console.log(tokenVerified)
        if (!tokenVerified._id) {
            return res.status(400).json({ message: "Token incorrecto" })
        }

        const userProfile = await User.findById(tokenVerified._id) //Búsqueda perfil usuario determinado

        req.userProfile = userProfile;
        next()

    } catch (error) {
        console.log(error)
    }
}
module.exports = { isAuth }

// Tipo de token bearertoken