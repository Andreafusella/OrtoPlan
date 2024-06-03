document.addEventListener('DOMContentLoaded', async () => {

    const apiKey = "30b35159cd1dfce6826a18b5fbbfacfc";
    const urlOggiMilano = `http://api.openweathermap.org/data/2.5/weather?q=Milano&appid=${apiKey}&units=metric`;
    const urlDomaniMilano = `http://api.openweathermap.org/data/2.5/forecast?q=Milano&appid=${apiKey}&units=metric`;

    const urlOggiRoma = `http://api.openweathermap.org/data/2.5/weather?q=Roma&appid=${apiKey}&units=metric`;
    const urlDomaniRoma = `http://api.openweathermap.org/data/2.5/forecast?q=Roma&appid=${apiKey}&units=metric`;

    const urlOggiPescara = `http://api.openweathermap.org/data/2.5/weather?q=Pescara&appid=${apiKey}&units=metric`;
    const urlDomaniPescara = `http://api.openweathermap.org/data/2.5/forecast?q=Pescara&appid=${apiKey}&units=metric`;

    const urlOggiNapoli = `http://api.openweathermap.org/data/2.5/weather?q=Napoli&appid=${apiKey}&units=metric`;
    const urlDomaniNapoli = `http://api.openweathermap.org/data/2.5/forecast?q=Napoli&appid=${apiKey}&units=metric`;


    try {
        const [
            responseOggiMilano, responseDomaniMilano,
            responseOggiRoma, responseDomaniRoma,
            responseOggiPescara, responseDomaniPescara,
            responseOgginapoli, responseDomaniNapoli, 
        ] = await Promise.all([
                fetch(urlOggiMilano), fetch(urlDomaniMilano),
                fetch(urlOggiRoma), fetch(urlDomaniRoma),
                fetch(urlOggiPescara), fetch(urlDomaniPescara),
                fetch(urlOggiNapoli), fetch(urlDomaniNapoli),
            ]);

        // if (!responseOggi.ok) {
        //     throw new Error('Città non trovata');
        // }
        // if (!responseDomani.ok) {
        //     throw new Error('Previsioni non disponibili');
        // }

        const oggiMilano = await responseOggiMilano.json();
        const dataForecastMilano = await responseDomaniMilano.json();

        const oggiRoma = await responseOggiRoma.json();
        const dataForecastRoma = await responseDomaniRoma.json();

        const oggiPescara = await responseOggiPescara.json();
        const dataForecastPescara = await responseDomaniPescara.json();

        const oggiNapoli = await responseOgginapoli.json();
        const dataForecastNapoli = await responseDomaniNapoli.json();

        displayWeather(
            oggiMilano, dataForecastMilano,
            oggiRoma, dataForecastRoma,
            oggiPescara, dataForecastPescara,
            oggiNapoli, dataForecastNapoli,

        );
    } catch (error) {
        console.log('error');
        console.log(error);
    }
})

function displayWeather(
    oggiMilano, dataForecastMilano,
    oggiRoma, dataForecastRoma,
    oggiPescara, dataForecastPescara,
    oggiNapoli, dataForecastNapoli,
    ) {

    // Previsioni per domani e dopodomani
    const forecastMilano = dataForecastMilano.list;
    const forecastRoma = dataForecastRoma.list;
    const forecastPescara = dataForecastPescara.list;
    const forecastNapoli = dataForecastNapoli.list;

    const now = new Date();
    const tomorrow = new Date(now);
    const dayAfterTomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    dayAfterTomorrow.setDate(now.getDate() + 2);

    const domaniMilano = forecastMilano.find(f => new Date(f.dt_txt).getDate() === tomorrow.getDate());
    const dopodomaniMilano = forecastMilano.find(f => new Date(f.dt_txt).getDate() === dayAfterTomorrow.getDate());
    const domaniRoma = forecastRoma.find(f => new Date(f.dt_txt).getDate() === tomorrow.getDate());
    const dopodomaniRoma = forecastRoma.find(f => new Date(f.dt_txt).getDate() === dayAfterTomorrow.getDate());
    const domaniPescara = forecastPescara.find(f => new Date(f.dt_txt).getDate() === tomorrow.getDate());
    const dopodomaniPescara = forecastPescara.find(f => new Date(f.dt_txt).getDate() === dayAfterTomorrow.getDate());
    const domaniNapoli = forecastNapoli.find(f => new Date(f.dt_txt).getDate() === tomorrow.getDate());
    const dopodomaniNapoli = forecastNapoli.find(f => new Date(f.dt_txt).getDate() === dayAfterTomorrow.getDate());
    milano();
    roma();
    pescara();
    napoli();

    //milano
    function milano(){

        const imgMeteo1 = document.getElementById('imgMeteo1');
        const textMeteo1 = document.getElementById('textMeteo1');
        const imgMeteo2 = document.getElementById('imgMeteo2');
        const textMeteo2 = document.getElementById('textMeteo2');
        const imgMeteo3 = document.getElementById('imgMeteo3');
        const textMeteo3 = document.getElementById('textMeteo3');
    
        const img1 = document.createElement('img');
        const h1 = document.createElement('h1');
        const temp1 = document.createElement('h1');
        const img2 = document.createElement('img');
        const h2 = document.createElement('h1');
        const temp2 = document.createElement('h1');
        const img3 = document.createElement('img');
        const h3 = document.createElement('h1');
        const temp3 = document.createElement('h1');
    
        h1.classList.add('text-black', 'font-bold', 'text-lg');
        temp1.classList.add('text-black', 'font-bold', 'text-lg');
        img1.classList.add('h-10');
        h2.classList.add('text-black', 'font-bold', 'text-lg');
        temp2.classList.add('text-black', 'font-bold', 'text-lg');
        img2.classList.add('h-10');
        h3.classList.add('text-black', 'font-bold', 'text-lg');
        temp3.classList.add('text-black', 'font-bold', 'text-lg');
        img3.classList.add('h-10');
    
        //oggi
        if (oggiMilano.weather[0].main == 'Clear') {
            img1.src = '/meteo/sole.png';
            h1.textContent = 'Soleggiato';
            temp1.textContent = `Temperatura: ${oggiMilano.main.temp} C°`;
    
        } else if (oggiMilano.weather[0].main == 'Clouds') {
            img1.src = '/meteo/nuvole.png';
            h1.textContent = 'Nuvoloso';
            temp1.textContent = `Temperatura: ${oggiMilano.main.temp} C°`;
    
        }else if (oggiMilano.weather[0].main == 'Rain'){
            img1.src = '/meteo/pioggia.png';
            h1.textContent = 'Pioggia';
            temp1.textContent = `Temperatura: ${oggiMilano.main.temp} C°`;
        } else {
            h1.textContent = 'Meteo attualmente non disponibile';
        }
    
        //domani
        if (domaniMilano.weather[0].main == 'Clear') {
            img2.src = '/meteo/sole.png';
            h2.textContent = 'Soleggiato';
            temp2.textContent = `Temperatura: ${domaniMilano.main.temp} C°`;
    
        } else if (domaniMilano.weather[0].main == 'Clouds') {
            img2.src = '/meteo/nuvole.png';
            h2.textContent = 'Nuvoloso';
            temp2.textContent = `Temperatura: ${domaniMilano.main.temp} C°`;
    
        }else if (domaniMilano.weather[0].main == 'Rain'){
            img2.src = '/meteo/pioggia.png';
            h2.textContent = 'Pioggia';
            temp2.textContent = `Temperatura: ${domaniMilano.main.temp} C°`;
        } else {
            h2.textContent = 'Meteo attualmente non disponibile';
        }
    
        //dopodomani
        if (dopodomaniMilano.weather[0].main == 'Clear') {
            img3.src = '/meteo/sole.png';
            h3.textContent = 'Soleggiato';
            temp3.textContent = `Temperatura: ${dopodomaniMilano.main.temp} C°`;
    
        } else if (dopodomaniMilano.weather[0].main == 'Clouds') {
            img3.src = '/meteo/nuvole.png';
            h3.textContent = 'Nuvoloso';
            temp3.textContent = `Temperatura: ${dopodomaniMilano.main.temp} C°`;
    
        }else if (dopodomaniMilano.weather[0].main == 'Rain'){
            img3.src = '/meteo/pioggia.png';
            h3.textContent = 'Pioggia';
            temp3.textContent = `Temperatura: ${dopodomaniMilano.main.temp} C°`;
        } else {
            h3.textContent = 'Meteo attualmente non disponibile';
        }
    
        imgMeteo1.appendChild(img1);
        textMeteo1.appendChild(h1);
        textMeteo1.appendChild(temp1);
    
        imgMeteo2.appendChild(img2);
        textMeteo2.appendChild(h2);
        textMeteo2.appendChild(temp2);
    
        imgMeteo3.appendChild(img3);
        textMeteo3.appendChild(h3);
        textMeteo3.appendChild(temp3);
    }

    //roma
    function roma(){

        const imgMeteo4 = document.getElementById('imgMeteo4');
        const textMeteo4 = document.getElementById('textMeteo4');
        const imgMeteo5 = document.getElementById('imgMeteo5');
        const textMeteo5 = document.getElementById('textMeteo5');
        const imgMeteo6 = document.getElementById('imgMeteo6');
        const textMeteo6 = document.getElementById('textMeteo6');
    
        const img4 = document.createElement('img');
        const h4 = document.createElement('h1');
        const temp4 = document.createElement('h1');
        const img5 = document.createElement('img');
        const h5 = document.createElement('h1');
        const temp5 = document.createElement('h1');
        const img6 = document.createElement('img');
        const h6 = document.createElement('h1');
        const temp6 = document.createElement('h1');
    
        h4.classList.add('text-black', 'font-bold', 'text-lg');
        temp4.classList.add('text-black', 'font-bold', 'text-lg');
        img4.classList.add('h-10');
        h5.classList.add('text-black', 'font-bold', 'text-lg');
        temp5.classList.add('text-black', 'font-bold', 'text-lg');
        img5.classList.add('h-10');
        h6.classList.add('text-black', 'font-bold', 'text-lg');
        temp6.classList.add('text-black', 'font-bold', 'text-lg');
        img6.classList.add('h-10');
    
        //oggi
        if (oggiRoma.weather[0].main == 'Clear') {
            img4.src = '/meteo/sole.png';
            h4.textContent = 'Soleggiato';
            temp4.textContent = `Temperatura: ${oggiRoma.main.temp} C°`;
    
        } else if (oggiRoma.weather[0].main == 'Clouds') {
            img4.src = '/meteo/nuvole.png';
            h4.textContent = 'Nuvoloso';
            temp4.textContent = `Temperatura: ${oggiRoma.main.temp} C°`;
    
        }else if (oggiRoma.weather[0].main == 'Rain'){
            img4.src = '/meteo/pioggia.png';
            h4.textContent = 'Pioggia';
            temp4.textContent = `Temperatura: ${oggiRoma.main.temp} C°`;
        } else {
            h4.textContent = 'Meteo attualmente non disponibile';
        }
    
        //domani
        if (domaniRoma.weather[0].main == 'Clear') {
            img5.src = '/meteo/sole.png';
            h5.textContent = 'Soleggiato';
            temp5.textContent = `Temperatura: ${domaniRoma.main.temp} C°`;
    
        } else if (domaniRoma.weather[0].main == 'Clouds') {
            img5.src = '/meteo/nuvole.png';
            h5.textContent = 'Nuvoloso';
            temp5.textContent = `Temperatura: ${domaniRoma.main.temp} C°`;
    
        }else if (domaniRoma.weather[0].main == 'Rain'){
            img5.src = '/meteo/pioggia.png';
            h5.textContent = 'Pioggia';
            temp5.textContent = `Temperatura: ${domaniRoma.main.temp} C°`;
        } else {
            h5.textContent = 'Meteo attualmente non disponibile';
        }
    
        //dopodomani
        if (dopodomaniRoma.weather[0].main == 'Clear') {
            img6.src = '/meteo/sole.png';
            h6.textContent = 'Soleggiato';
            temp6.textContent = `Temperatura: ${dopodomaniRoma.main.temp} C°`;
    
        } else if (dopodomaniRoma.weather[0].main == 'Clouds') {
            img6.src = '/meteo/nuvole.png';
            h6.textContent = 'Nuvoloso';
            temp6.textContent = `Temperatura: ${dopodomaniRoma.main.temp} C°`;
    
        }else if (dopodomaniRoma.weather[0].main == 'Rain'){
            img6.src = '/meteo/pioggia.png';
            h6.textContent = 'Pioggia';
            temp6.textContent = `Temperatura: ${dopodomaniRoma.main.temp} C°`;
        } else {
            h6.textContent = 'Meteo attualmente non disponibile';
        }
    
        imgMeteo4.appendChild(img4);
        textMeteo4.appendChild(h4);
        textMeteo4.appendChild(temp4);
    
        imgMeteo5.appendChild(img5);
        textMeteo5.appendChild(h5);
        textMeteo5.appendChild(temp5);
    
        imgMeteo6.appendChild(img6);
        textMeteo6.appendChild(h6);
        textMeteo6.appendChild(temp6);
        
    }
    
    //pescara
    function pescara(){

        const imgMeteo7 = document.getElementById('imgMeteo7');
        const textMeteo7 = document.getElementById('textMeteo7');
        const imgMeteo8 = document.getElementById('imgMeteo8');
        const textMeteo8 = document.getElementById('textMeteo8');
        const imgMeteo9 = document.getElementById('imgMeteo9');
        const textMeteo9 = document.getElementById('textMeteo9');

        const img7 = document.createElement('img');
        const h7 = document.createElement('h1');
        const temp7 = document.createElement('h1');
        const img8 = document.createElement('img');
        const h8 = document.createElement('h1');
        const temp8 = document.createElement('h1');
        const img9 = document.createElement('img');
        const h9 = document.createElement('h1');
        const temp9 = document.createElement('h1');

        h7.classList.add('text-black', 'font-bold', 'text-lg');
        temp7.classList.add('text-black', 'font-bold', 'text-lg');
        img7.classList.add('h-10');
        h8.classList.add('text-black', 'font-bold', 'text-lg');
        temp8.classList.add('text-black', 'font-bold', 'text-lg');
        img8.classList.add('h-10');
        h9.classList.add('text-black', 'font-bold', 'text-lg');
        temp9.classList.add('text-black', 'font-bold', 'text-lg');
        img9.classList.add('h-10');

        //oggi
        if (oggiPescara.weather[0].main == 'Clear') {
            img7.src = '/meteo/sole.png';
            h7.textContent = 'Soleggiato';
            temp7.textContent = `Temperatura: ${oggiPescara.main.temp} C°`;
    
        } else if (oggiPescara.weather[0].main == 'Clouds') {
            img7.src = '/meteo/nuvole.png';
            h7.textContent = 'Nuvoloso';
            temp7.textContent = `Temperatura: ${oggiPescara.main.temp} C°`;
    
        }else if (oggiPescara.weather[0].main == 'Rain'){
            img7.src = '/meteo/pioggia.png';
            h7.textContent = 'Pioggia';
            temp7.textContent = `Temperatura: ${oggiPescara.main.temp} C°`;
        } else {
            h7.textContent = 'Meteo attualmente non disponibile';
        }
    
        //domani
        if (domaniPescara.weather[0].main == 'Clear') {
            img8.src = '/meteo/sole.png';
            h8.textContent = 'Soleggiato';
            temp8.textContent = `Temperatura: ${domaniPescara.main.temp} C°`;
    
        } else if (domaniPescara.weather[0].main == 'Clouds') {
            img8.src = '/meteo/nuvole.png';
            h8.textContent = 'Nuvoloso';
            temp8.textContent = `Temperatura: ${domaniPescara.main.temp} C°`;
    
        }else if (domaniPescara.weather[0].main == 'Rain'){
            img8.src = '/meteo/pioggia.png';
            h8.textContent = 'Pioggia';
            temp8.textContent = `Temperatura: ${domaniPescara.main.temp} C°`;
        } else {
            h8.textContent = 'Meteo attualmente non disponibile';
        }
    
        //dopodomani
        if (dopodomaniPescara.weather[0].main == 'Clear') {
            img9.src = '/meteo/sole.png';
            h9.textContent = 'Soleggiato';
            temp9.textContent = `Temperatura: ${dopodomaniPescara.main.temp} C°`;
    
        } else if (dopodomaniPescara.weather[0].main == 'Clouds') {
            img9.src = '/meteo/nuvole.png';
            h9.textContent = 'Nuvoloso';
            temp9.textContent = `Temperatura: ${dopodomaniPescara.main.temp} C°`;
    
        }else if (dopodomaniPescara.weather[0].main == 'Rain'){
            img9.src = '/meteo/pioggia.png';
            h9.textContent = 'Pioggia';
            temp9.textContent = `Temperatura: ${dopodomaniPescara.main.temp} C°`;
        } else {
            h9.textContent = 'Meteo attualmente non disponibile';
        }
    
        imgMeteo7.appendChild(img7);
        textMeteo7.appendChild(h7);
        textMeteo7.appendChild(temp7);
    
        imgMeteo8.appendChild(img8);
        textMeteo8.appendChild(h8);
        textMeteo8.appendChild(temp8);
    
        imgMeteo9.appendChild(img9);
        textMeteo9.appendChild(h9);
        textMeteo9.appendChild(temp9);
    }

    //napoli
    function napoli(){

        const imgMeteo10 = document.getElementById('imgMeteo10');
        const textMeteo10 = document.getElementById('textMeteo10');
        const imgMeteo11 = document.getElementById('imgMeteo11');
        const textMeteo11 = document.getElementById('textMeteo11');
        const imgMeteo12 = document.getElementById('imgMeteo12');
        const textMeteo12 = document.getElementById('textMeteo12');

        const img10 = document.createElement('img');
        const h10 = document.createElement('h1');
        const temp10 = document.createElement('h1');
        const img11 = document.createElement('img');
        const h11 = document.createElement('h1');
        const temp11 = document.createElement('h1');
        const img12 = document.createElement('img');
        const h12 = document.createElement('h1');
        const temp12 = document.createElement('h1');

        h10.classList.add('text-black', 'font-bold', 'text-lg');
        temp10.classList.add('text-black', 'font-bold', 'text-lg');
        img10.classList.add('h-10');
        h11.classList.add('text-black', 'font-bold', 'text-lg');
        temp11.classList.add('text-black', 'font-bold', 'text-lg');
        img11.classList.add('h-10');
        h12.classList.add('text-black', 'font-bold', 'text-lg');
        temp12.classList.add('text-black', 'font-bold', 'text-lg');
        img12.classList.add('h-10');

        //oggi
        if (oggiNapoli.weather[0].main == 'Clear') {
            img10.src = '/meteo/sole.png';
            h10.textContent = 'Soleggiato';
            temp10.textContent = `Temperatura: ${oggiNapoli.main.temp} C°`;
    
        } else if (oggiNapoli.weather[0].main == 'Clouds') {
            img10.src = '/meteo/nuvole.png';
            h10.textContent = 'Nuvoloso';
            temp10.textContent = `Temperatura: ${oggiNapoli.main.temp} C°`;
    
        }else if (oggiNapoli.weather[0].main == 'Rain'){
            img10.src = '/meteo/pioggia.png';
            h10.textContent = 'Pioggia';
            temp10.textContent = `Temperatura: ${oggiNapoli.main.temp} C°`;
        } else {
            h10.textContent = 'Meteo attualmente non disponibile';
        }
    
        //domani
        if (domaniNapoli.weather[0].main == 'Clear') {
            img11.src = '/meteo/sole.png';
            h11.textContent = 'Soleggiato';
            temp11.textContent = `Temperatura: ${domaniNapoli.main.temp} C°`;
    
        } else if (domaniNapoli.weather[0].main == 'Clouds') {
            img11.src = '/meteo/nuvole.png';
            h11.textContent = 'Nuvoloso';
            temp11.textContent = `Temperatura: ${domaniNapoli.main.temp} C°`;
    
        }else if (domaniNapoli.weather[0].main == 'Rain'){
            img11.src = '/meteo/pioggia.png';
            h11.textContent = 'Pioggia';
            temp11.textContent = `Temperatura: ${domaniNapoli.main.temp} C°`;
        } else {
            h11.textContent = 'Meteo attualmente non disponibile';
        }
    
        //dopodomani
        if (dopodomaniNapoli.weather[0].main == 'Clear') {
            img12.src = '/meteo/sole.png';
            h12.textContent = 'Soleggiato';
            temp12.textContent = `Temperatura: ${dopodomaniNapoli.main.temp} C°`;
    
        } else if (dopodomaniNapoli.weather[0].main == 'Clouds') {
            img12.src = '/meteo/nuvole.png';
            h12.textContent = 'Nuvoloso';
            temp12.textContent = `Temperatura: ${dopodomaniNapoli.main.temp} C°`;
    
        }else if (dopodomaniNapoli.weather[0].main == 'Rain'){
            img12.src = '/meteo/pioggia.png';
            h12.textContent = 'Pioggia';
            temp12.textContent = `Temperatura: ${dopodomaniNapoli.main.temp} C°`;
        } else {
            h12.textContent = 'Meteo attualmente non disponibile';
        }
    
        imgMeteo10.appendChild(img10);
        textMeteo10.appendChild(h10);
        textMeteo10.appendChild(temp10);
    
        imgMeteo11.appendChild(img11);
        textMeteo11.appendChild(h11);
        textMeteo11.appendChild(temp11);
    
        imgMeteo12.appendChild(img12);
        textMeteo12.appendChild(h12);
        textMeteo12.appendChild(temp12);
    }
}