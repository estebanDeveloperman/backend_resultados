import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Contraseña Incorrecta!" });

  console.log("login", user.iduser);
  req.session.userId = user.iduser;
  console.log("login trae al session -> ", user.iduser);
  const iduser = user.iduser;
  const username = user.username;
  //   const email = user.email;
  //   const role = user.role;
  res.status(200).json({ iduser, username });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "Por favor iniciar sesión en tu cuenta" });
    // .json({ msg: "JAJAN'T" });
  }
  const user = await User.findOne({
    attributes: [
      "iduser",
      "username",
      "email",
      "firstname",
      "surnames",
      "phone",
      "function_name",
      "status",
    ],
    where: {
      iduser: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "Usuario no encontradooo" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "No puedes cerrar sesión!" });
    res.status(200).json({ msg: "Has cerrado sesión!" });
  });
};
