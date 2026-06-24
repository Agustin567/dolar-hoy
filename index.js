importar { Terminal } desde "@es-js/terminal"
importar { obtenerJson } desde "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js"
importar { validarSecreto } desde "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js"

asincrono funcion inicio() {
  Terminal.escribir("Hola! Ingresa la palabra secreta:")

  var secreto = esperar Terminal.leer()

  var dni = "46005414"

  si (esperar validarSecreto(dni, secreto)) {
    esperar mostrarCotizacion()
  } sino {
    Terminal.escribir("Palabra secreta inválida")
  }

  Terminal.escribir("Presiona ENTER para volver a ingresar")

  esperar Terminal.leerEnter()

  Terminal.limpiar()

  inicio()
}

asincrono funcion mostrarCotizacion() {
  Terminal.escribir("Cargando cotización...")

  intentar {
    var datos = esperar obtenerJson("https://criptoya.com/api/dolar")
    var dolarBlue = datos.blue

    Terminal.limpiar()
    Terminal.escribir("--- Cotización del Dólar Blue Hoy ---")
    Terminal.escribir("Precio de Venta: $" + dolarBlue.ask)
    Terminal.escribir("Precio de Compra: $" + dolarBlue.bid)
    
    var promedio = (dolarBlue.ask + dolarBlue.bid) / 2
    Terminal.escribir("Promedio: $" + promedio)
    Terminal.escribir("-------------------------------------")
  } capturar (error) {
    Terminal.escribir("Error al obtener la cotización.")
  }
}

inicio()
