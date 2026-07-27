let movies = [];

const movieInput = document.getElementById("movieInput");
const movieList = document.getElementById("movieList");

document.getElementById("addButton").addEventListener("click", function () {
    const movie = movieInput.value.trim();

    if (movie !== "") {
        movies.push(movie);
        movieInput.value = "";
    }
});

document.getElementById("displayButton").addEventListener("click", function () {
    movies.sort();

    movieList.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
        movieList.innerHTML += movies[i] + "<br>";
    }
});

document.getElementById("resetButton").addEventListener("click", function () {
    movies = [];
    movieList.innerHTML = "";
    movieInput.value = "";
});
