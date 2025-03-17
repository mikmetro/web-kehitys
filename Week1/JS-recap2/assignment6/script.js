const movies = [];

const howManyMovies = parseInt(prompt("How many movies do you want to rate?"));

for (let i = 0; i < howManyMovies; i++) {
  const movieName = prompt("Enter a movie name (or 'done' to finish)");
  if (movieName === "done") break;

  const movieRating = parseFloat(prompt("Enter a rating (1-5)"));

  movies.push({
    title: movieName,
    rating: movieRating,
  });
}

movies.sort((a, b) => b.rating - a.rating);

const highestRated = document.createElement("p");
highestRated.textContent = `Highest rated (${movies[0].rating.toFixed(2)}): ${
  movies[0].title
}`;

const movieList = document.createElement("ol");

for (const movie of movies) {
  const movieListItem = document.createElement("li");
  movieListItem.textContent = `${movie.title} (${movie.rating.toFixed(2)})`;

  movieList.append(movieListItem);
}

document.body.append(highestRated, movieList);
