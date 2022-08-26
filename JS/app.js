// Get All Countries ----------->

const allCountries = () => {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(res => res.json())
        .then(data => getCountries(data))
}
allCountries();

const getCountries = (countries) => {
    const countryUi = document.getElementById('country-ui')
    countries.forEach(country => {
        // console.log(country);
        const div = document.createElement('div');
        div.classList.add('single-country')
        div.innerHTML = `
            <h4 class='text-2xl font-bold'>${country.name.common}</h4>
            <p class='text-xl'>${country.capital}</p>
            <button onclick="details('${country.name.common}')" class='bg-green-400 px-4 py-1 rounded text-white mt-2'>Details</button>
        `
        countryUi.appendChild(div);
    })
}

// Search Countries -------------->

const searchCountry = () => {
    const input = document.getElementById('country-input')
    const inputValue = input.value;
    input.value = '';

    if (inputValue.length == 4) {
        fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
            .then(res => res.json())
            .then(data => country(data))
    }
}

const country = (countries) => {
    const search = document.getElementById('search-country');
    search.textContent = ``;
    countries.forEach(country => {
        const div = document.createElement('div');
        div.classList.add('search-country')
        div.innerHTML = `
        <h4 class='text-2xl font-bold'>${country.name.common}</h4>
        <p class='text-xl'>${country.capital}</p>
        <button onclick="details('${country.name.common}')" class='bg-green-400 px-4 py-1 rounded text-white mt-2'>Details</button>
        `
        search.appendChild(div);
    })
}

// Country-Details -------------->

const details = (name) => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(res => res.json())
        .then(data => showDetails(data[0]))
}

const showDetails = (details) => {
    const detailsSec = document.getElementById('details-sec');
    detailsSec.textContent = ``
    const div = document.createElement('div');
    div.innerHTML = `  
            <div class='lg:flex lg:justify-center lg:items-center lg:flex-col'>
                <img src="${details.flags.png}" alt="">
                <div class='mt-4'>
                    <h1>Name: ${details.name.common}</h1>
                    <p>Capital: ${details.capital}</p>
                    <p>Area: ${details.area}</p>
                    <p>Population: ${details.population}</p>
                    <p>Region: ${details.region}</p>
                    <p>StartOfWeek: ${details.startOfWeek}</p>
                    <p>Timezones: ${details.timezones}</p>
                </div>
            </div>
    `
    detailsSec.appendChild(div);
}

