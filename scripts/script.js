const key ="d90ff67156bc289cf5e79d6be28f583f"

function dataOnScreen(data){
    document.querySelector(".city").innerHTML = "Weather in " + data.name
    document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + " °C"
    document.querySelector(".prev").innerHTML = data.weather[0].description
    document.querySelector(".cd").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
}

async function citySearch(city){
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`).then(response => response.json())
    
    dataOnScreen(data)
}

function btnsearch(){
    const city = document.querySelector(".input-city").value

    citySearch(city)
}

document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o campo de entrada pelo ID "enter"
    const inputElement = document.querySelector(".input-city");

    // Adiciona um ouvinte de evento para a tecla "Enter"
    inputElement.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            // Evita o comportamento padrão do formulário (não recarrega a página)
            event.preventDefault();
            // Chama a função btnsearch() quando a tecla "Enter" for pressionada
            btnsearch();
        }
    });
});
