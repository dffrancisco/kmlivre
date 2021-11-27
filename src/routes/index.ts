import { Router } from "express";
import auth from "../services/auth";
import login from "../login/ctrl.login";
import trajeto from '../trajeto/ctrl.trajeto'
import usuarios from '../usuarios/ctrl.usuarios'


const router = Router();
const routers = [
  router.post("/login", login),
  router.post("/trajeto", auth.authorize, trajeto),
  router.post("/usuarios", auth.authorize, usuarios)
];

export default routers;
