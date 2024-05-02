import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "Por favor iniciar sesión en tu cuenta!" });
  }
  const user = await User.findOne({
    where: {
      iduser: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  req.userId = user.iduser;
  //   req.role = user.role;
  next();
};
