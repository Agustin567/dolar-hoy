import { Terminal } from "@es-js/terminal"
import { obtenerJson } from "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js"
import { validarSecreto } from "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js"

async function inicio() {
  Terminal.escribir("Hola! Ingresa la palabra secreta:")

  var secreto = await Terminal.leer()

  var dni = "46005414"

  if (await validarSecreto(dni, secreto)) {
    await mostrarCotizacion()
  } else {
    Terminal.escribir("Palabra secreta inválida")
  }

  Terminal.escribir("Presiona ENTER para volver a ingresar")

  await Terminal.leerEnter()

  Terminal.limpiar()

  inicio()
}

async function mostrarCotizacion() {
  Terminal.escribir("Cargando cotización...")

  try {
    var datos = await obtenerJson("https://criptoya.com/api/dolar")
    var dolarBlue = datos.blue

    Terminal.limpiar()
    Terminal.escribir("--- Cotización del Dólar Blue Hoy ---")
    Terminal.escribir("Precio de Venta: $" + dolarBlue.ask)
    Terminal.escribir("Precio de Compra: $" + dolarBlue.bid)
    
    var promedio = (dolarBlue.ask + dolarBlue.bid) / 2
    Terminal.escribir("Promedio: $" + promedio)
    Terminal.escribir("-------------------------------------")
  } catch (error) {
    Terminal.escribir("Error al obtener la cotización.")
  }
}

inicio()
