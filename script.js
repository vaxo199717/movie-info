const inputTitle = document.querySelector('#input-title');
const inputYear = document.querySelector('#input-year');
const searchBtn = document.querySelector('#searchBtn');
const startingPage = document.querySelector('.starting-page');
const startingMessage = document.querySelector('.starting-message');
const startingText = document.querySelector('.starting-text');
const startImage = document.querySelector('.hand-icon');
const loader = document.querySelector('.loader');
const movieContent = document.querySelector('.movie-content');

const leftHalf = document.querySelector('.left-half');

const title = document.querySelector('.title');
const releaseDate = document.querySelector('.releaseDate');
const imdb = document.querySelector('#imdbText');
const rottenTomatoes = document.querySelector('#rottenTomatoes');
const metacritic = document.querySelector('#metacritic');
const director = document.querySelector('#director');
const genre = document.querySelector('#genre');
const country = document.querySelector('#country');
const boxOffice = document.querySelector('#box-office');
const actors = document.querySelector('#actors');
const company = document.querySelector('#company');
const runtime = document.querySelector('#runtime');
const age = document.querySelector('#age');
const about = document.querySelector('#about');

let movieName;


searchBtn.addEventListener('click', () => {
    if(inputTitle.value.length === 9 && inputTitle.value.substr(0,2) === 'tt'){
        movieName = 'i=' + inputTitle.value
    }else{
        movieName = 't=' + inputTitle.value
    }
    let movieYear = inputYear.value;
    let url = `http://www.omdbapi.com/?${movieName}&y=${movieYear}&plot=full&apikey=9d186439`;
    startingPage.style.display = 'block';
    startingMessage.style.display = 'none';
    loader.style.display = 'block';
    setTimeout(() => {
        loader.style.display = 'none';
        startingPage.style.display = 'none';
    }, 1000);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.Poster === 'N/A'?leftHalf.innerHTML = `<img class="poster" src="images/no-poster.png" alt="">` :leftHalf.innerHTML = leftHalf.innerHTML = `<img class="poster" src="${data.Poster}" alt="">`
            console.log(data.Poster)
            title.textContent = data.Title || notFound();
            releaseDate.textContent = data.Year || 'N/A';
            data.Ratings[0] === undefined?imdb.textContent = 'N/A':imdb.textContent = data.Ratings[0].Value;
            data.Ratings[1] === undefined?rottenTomatoes.textContent = 'N/A':rottenTomatoes.textContent = data.Ratings[1].Value;
            data.Ratings[2] === undefined?metacritic.textContent = 'N/A':metacritic.textContent = data.Ratings[2].Value;
            director.textContent = data.Director || 'N/A';
            genre.textContent = data.Genre || 'N/A';
            country.textContent = data.Country || 'N/A';
            boxOffice.textContent = data.BoxOffice || 'N/A';
            actors.textContent = data.Actors || 'N/A';
            company.textContent = data.Production ||'N/A'; 
            runtime.textContent = data.Runtime || 'N/A';
            age.textContent = data.Rated || 'N/A';
            about.textContent = data.Plot.substr(0, 550) + '...' || 'N/A';
            
        })
})
 function notFound(){
    movieContent.style.display = 'none';    
    setTimeout(() => {
        startImage.innerHTML = '<img style="width:300px" src="/images/404.PNG" alt="Poster not found">'
        startingPage.style.display = 'block';
        startingText.textContent = 'Movie not found'
        startingMessage.style.display = 'block';
    }, 1000);
}









// fetch('https://www.superheroapi.com/api.php/1911358435685318/search/superman')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//         })

