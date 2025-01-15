
const getValor = async() => {
    const valor = document.getElementById("pesos").value
    const moneda_tipo = document.getElementById("moneda").value
    let conversion = document.getElementById("valor")
   
    try {
        const convertir = await fetch("https://mindicador.cl/api/")
        const data = await convertir.json();
        let valor_moneda = '';
        let resultado;
        if(valor < 0){
            alert("Introduzca un número mayor o igual a cero")
        }else if(moneda_tipo === "dolar" && valor >= 0){
            valor_moneda = data.dolar.valor;
            resultado = (valor/valor_moneda).toFixed(2)
            conversion.innerHTML = `Resultado: $${resultado}`
            datosGrafico(moneda_tipo);
        }else if(moneda_tipo === "euro" && valor >= 0){
            valor_moneda = data.euro.valor;
            resultado = (valor/valor_moneda).toFixed(2)
            conversion.innerHTML = `Resultado: $${resultado}`
            datosGrafico(moneda_tipo);
        }else if(moneda_tipo === "uf" && valor >= 0){
            valor_moneda = data.uf.valor;
            resultado = (valor/valor_moneda).toFixed(2)
            conversion.innerHTML = `Resultado: $${resultado}`
            datosGrafico(moneda_tipo);
        } 
        console.log(valor_moneda)
        
    } catch (error) {
        console.log('Está ocurriendo el siguiente error:',error)
    }
    
};
getValor()

async function datosGrafico(moneda_tipo){
    try {
        const response = await fetch(`https://mindicador.cl/api/${moneda_tipo}`)
        const data = await response.json();

        // Aquí se extraen las últimas 10 fechas
        const datos = data.serie.slice(0,10).reverse()
        const fechas = datos.map(punto => punto.fecha.slice(0,10));
        const valores = datos.map(punto => punto.valor);

        const ctx = document.getElementById("grafico").getContext('2d')

        if(window.chartInstance){
            window.chartInstance.destroy();
        }
        window.chartInstance = new Chart(ctx, { 
            type : "line",
            data: {
                labels: fechas,
                datasets: [{
                    label: `Valor de la moneda ${moneda_tipo} en los últimos 10 días`,
                    data: valores,
                    borderColor: "rgb(244, 14, 14)",
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                scales:{
                    x: {
                        title:{
                            display: true,
                            text: "Fecha"
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Valor"
                    },
                    beginAtZero: false
                }
            },
            elements: {
                line: {
                    backgroundColor: 'rgba(255, 255, 255)'
                }
            }
        });

    } catch (error) {
        alert("Error al obtener datos para el gráfico", error)
    }
}


