//event handler
const searchBtn = document.querySelector('.search-button'); // DOM get search button
searchBtn.addEventListener('click', function () {
  // add Event Listener Klik
  const inputKeyword = document.querySelector('.input-keyword'); // get value in input box
  fetch('http://www.omdbapi.com/?apikey=e179c589&s=' + inputKeyword.value) // fetch API untuk cari link film
    .then((response) => response.json()) // jika fulfill tangkap respon dan ubah respon menjadi json
    .then((response) => {
      const movies = response.Search; // untuk mmasuk ke object Search (jika tidak ada maka tidak perlu)
      let cards = ''; // inisiasi Card untuk ditumpuk Looping
      movies.forEach((m) => (cards += showCards(m))); // Looping card
      const movieContainer = document.querySelector('.movie-container'); // Get class untuk dimasukan cards hasil looping
      movieContainer.innerHTML = cards; // memasukan cards ke HTML

      //ketika tombol detail di klik
      const modalDetailBtn = document.querySelectorAll('.modal-detail-button'); //get Detail Button
      modalDetailBtn.forEach((btn) => {
        //Detail Button di looping
        btn.addEventListener('click', function () {
          const imdbid = this.dataset.imdbid; // dataset digunakan untuk mengambil value ID imdb di atribut data di HTML, atribut data ada di class button
          fetch('http://www.omdbapi.com/?apikey=e179c589&i=' + imdbid) //fetch API dengan id imdb
            .then((response) => response.json()) //tangkap respon saat fullfil menjadi json
            .then((m) => {
              const movieDetail = showMovieDetail(m); // tampilan show movie ditangkap variabel
              const modalBody = document.querySelector('.modal-body'); //get class untuk memasang show movie
              modalBody.innerHTML = movieDetail; //masukan ke dalam HTML
            });
        });
      });
    });
});

function showCards(m) {
  return `
  <div class="col-md-4 my-3">
      <div class="card">
          <img src="${m.Poster}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <button type="button" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid=${m.imdbID}>
            Show Details
            </button>
          </div>
        </div>
  </div>
  `;
}

function showMovieDetail(m) {
  return `
  <div class="container-fluid">
      <div class="row">
          <div class="col-md-5">
              <img src="${m.Poster}" class="img-fliud">
          </div>
          <div class="col-md">
              <ul class="list-group">
                  <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                  <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
                  <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                  <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                  <li class="list-group-item"><strong>Plot:</strong><br>${m.Plot}</li>
              </ul>
          </div>
      </div>
  </div>
  `;
}
