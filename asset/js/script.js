
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
        }else if(moneda_tipo === "Dolar" && valor >= 0){
            valor_moneda = data.dolar.valor;
            resultado = (valor/valor_moneda).toFixed(2)
            conversion.innerHTML = `Resultado: $${resultado}`
        }else if(moneda_tipo === "Euro" && valor >= 0){
            valor_moneda = data.euro.valor;
            resultado = (valor/valor_moneda).toFixed(2)
            conversion.innerHTML = `Resultado: $${resultado}`
        }else if(moneda_tipo === "UF" && valor >= 0){
            valor_moneda = data.uf.valor;
            resultado = (valor/valor_moneda).toFixed(2)
            conversion.innerHTML = `Resultado: $${resultado}`
        } 
        console.log(valor_moneda)
    } catch (error) {
        console.log('Está ocurriendo el siguiente error:',error)
    }
    
}
getValor()