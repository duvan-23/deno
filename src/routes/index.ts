import { Router } from "../../deps.ts";
import {
  createColor,
  findColor
} from "../controllers/color.tsx";

export const router = new Router()
  //Colores routes
  .get("/", findColor)
  .post("/", createColor);