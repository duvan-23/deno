import { Context, helpers,RouterContext} from "../../deps.ts";
import type { Color } from "../types/color.ts";
import * as db from "../db/index.ts";

import React from "https://jspm.dev/react@17.0.2";
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";
import { App } from "../../component/App.tsx";


export const findColor = async (ctx: Context) => {
  try {
    const body = ReactDOMServer.renderToString(<App/>);
    const color: Color[] = await db.findColores();
    // ctx.response.body = productos;
    let colores="<ul >";
    color.forEach(element => {
      colores +=`<li style='color:${element.color}'>${element.color}</li>`;
    });
    colores +=`</ul>`;
    ctx.response.body = `
    <!DOCTYPE html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body >
  
          <div id="root">${body}</div>
          <form action="/" method="post">
            <label for="color">Color</label>
            <input type="text" id="color" name="color"><br><br>
            <input type="submit" value="Submit">
          </form>
          <br>
          <div style='background:black;'>${colores}</div>
      </body>
    </html>
    `;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};


export const createColor = async (ctx: RouterContext) => {
  try {
    const body = ctx.request.body({ type: 'form' })
  const value = await body.value
  const createdColor: Color = await db.createColor(value.get('color'));
  const body2 = ReactDOMServer.renderToString(<App/>);
  const color2: Color[] = await db.findColores();
  let colores="<ul >";
    color2.forEach(element => {
      colores +=`<li style='color:${element.color}'>${element.color}</li>`;
    });
    colores +=`</ul>`;
    ctx.response.body = `
    <!DOCTYPE html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body >
  
          <div id="root">${body2}</div>
          <form action="/" method="post">
            <label for="color">Color</label>
            <input type="text" id="color" name="color"><br><br>
            <input type="submit" value="Submit">
          </form>
          <br>
          <div style='background:black;'>${colores}</div>
      </body>
    </html>
    `;
  // ctx.response.body = createdColor;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};
