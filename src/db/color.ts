import type { Color, Uuid } from "../types/color.ts";

const colores: Color[] = []


export const findColores = (): Color[] => {
  return colores
}

export const createColor = (
  color: string
): Color => {
  const producto: Color = {
    id: globalThis.crypto.randomUUID(),
    color
  }
  colores.push(producto)
  return producto
};

