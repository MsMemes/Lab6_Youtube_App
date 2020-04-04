let antToken = '';
let sigToken = '';
let strSearch = '';

$('#Search').submit( function (event) {
    event.preventDefault();
    strSearch = event.currentTarget['0'].value;

    borrarAnt();
    Search(strSearch, '');
});


$('#Next').click(function (event) {
  if(sigToken) {
      borrarAnt();
      Search(strSearch, sigToken);
  }
});

$('#Prev').click(function (event) {
    if(antToken) {
        borrarAnt();
        Search(strSearch, antToken);
    }
});

function borrarAnt() {
    $('.video').empty();
}

function Search(strSearch, page) {

    let resultados = [];

    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        type: 'GET',
        data: {
            'key': 'AIzaSyBz3w_8mTGIoOFZCfsofFEp86VtLW1MKyk',
            'part': 'id, snippet',
            'q': strSearch,
            'maxResults': '10',
            'pageToken': page
        }
    }).done((result) => {
        console.log(result);

        sigToken = result.nextPageToken;
        antToken = result.prevPageToken;

        borrarAnt();
        resultados = result.items;

        let mostrar = [];
        for (item of resultados) {

            mostrar.push(
                '<div class="video">' +
                '<a target="_blank" href="https://www.youtube.com/watch?v=' + item.id.videoId + '">' +
                '<img src=" '+ item.snippet.thumbnails.default.url + ' ">' +
                '<h3>'+ item.snippet.title + '</h3>' +
                '</a>' +
                '</div>'
            );
        }

        $('.video').append(mostrar);

    }).fail((error) => {
        console.log(error);
    });
}





