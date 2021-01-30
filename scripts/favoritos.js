"use strict";

var musicasFavoritos = [];
var novaMusica;

function removerFavorito(i) {
    localStorage.removeItem(i);
    refreshFavorito(i);
}


function inicializarFavoritos() {
    var listLocalStorage = getLocalStorage();
    for (var i = 0; i < listLocalStorage.length; i++){
        getTrack(listLocalStorage[i]);
    }
}

function showFavoritos() {
    $("#favoritosList").ready(function(){
        for (var i = 0; i < musicasFavoritos.length - 1; i++) {
            var musica =
                "<div class='card' >" +
                //"<img class='card-img-top' src=" + musicasFavoritos[i].image[0]['#text'] + ">" +
                "<div class='card-body'>" +
                "<h5 class='card-title'>Nome: " + musicasFavoritos[i].name + "</h5>" +
                "<div class='card-text'>" +
                "Artista: " + musicasFavoritos[i].artist.name +
                "</div>" +
                "<div>" +
                //album
                "</div>" +
                "</div>" +
                "<a href='../html/detalhes.html' onclick='saveMbid(" + i + ")' class='btn btn-primary add-fav'>Ver Detalhes</a>" +
                "<div id=" + musicasFavoritos[i].mbid + ">" +
                icon +
                "</div>" +
            "</div>";
            $("#favoritosList").append(musica);
        }
    });
}

function saveMbid(i) {
    localStorage.setItem("mbid", musicasFavoritos[i].mbid);
}

function getTrack(key) {
    $.ajax({
        url: API_URL + '/2.0/?method=track.getInfo&api_key=' + API_KEY + '&mbid=' + localStorage.getItem(key) + '&format=json'
    }).done(function (resultados) {
        novaMusica = resultados;
        musicasFavoritos.push(novaMusica.track);
        showFavoritos();
    });
}

function getLocalStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}