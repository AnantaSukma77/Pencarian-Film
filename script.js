$('.search-button').on('click', function () {
  $.ajax({
    url: 'http://www.omdbapi.com/?apikey=e179c589&s=' + $('.input-keyword').val(),
    success: (results) => {
      const movies = results.Search;
      let cards = '';
      movies.forEach((element) => {
        cards += `
                <div class="col-md-4 my-3">
                    <div class="card">
                        <img src="${element.Poster}" class="card-img-top">
                        <div class="card-body">
                          <h5 class="card-title">${element.Title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${element.Year}</h6>
                          <button type="button" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid=${element.imdbID}>
                          Show Details
                          </button>
                        </div>
                      </div>
                </div>
                `;
      });
      $('.movie-container').html(cards);

      $('.modal-detail-button').on('click', function () {
        $.ajax({
          url: 'http://www.omdbapi.com/?apikey=e179c589&i=' + $(this).data('imdbid'),
          success: (m) => {
            const movieDetail = `
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
            $('.modal-body').html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

// $.ajax({
//   url: 'http://www.omdbapi.com/?apikey=e179c589&s=avengers',
//   success: (results) => {
//     console.log(results);
//   },
// });
