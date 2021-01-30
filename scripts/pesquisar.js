var cloneMedia = $('.media').clone();

$('#btSearch').on('click', function(){

    var valorPesquisa = $('#pesquisa').val();
    $('.panel-title').text('Resultados da pesquisa de "' + valorPesquisa + '"');

    $('.media-list').html('');

    $.ajax({
        method: "GET",
        url: API_URL + '/2.0/?method=track.getInfo&api_key=' + API_KEY + '&mbid=' + localStorage.getItem("mbid") + '&format=json'
    })
        .done(function(msg){
            //console.log('msg');
            console.log(msg);

            //$.each(msg.Search, function(index, result){
            msg.Search.forEach(function(result){
                var liMedia = cloneMedia.clone();
                //$('a', liMedia).attr('href', 'http://www.imdb.com/title/'+ result.imdbID);
                if(result.Poster != 'N/A')
                    //$('#image', liMedia).attr("src", result.Poster);
                    $( "#track-name" ).text(detalhesMusica.track.name);
            })
        })
});