"use strict";
const API_KEY = "5ba1f5ca210bd7e2abd6f9476393c155";
const API_URL = "http://ws.audioscrobbler.com";

var detalhesMusica;
var detalhesAlbum;
var detalhesArtista;

function getDetalhesMusica() {
    $.ajax({
        url: API_URL + '/2.0/?method=track.getInfo&api_key=' + API_KEY + '&mbid=' + sessionStorage.getItem("mbid") + '&format=json'
    }).done(function (resultados) {
        detalhesMusica = resultados;
        getDetalhesAlbum();
    });
}

function getDetalhesAlbum() {
    $.ajax({
        url: API_URL + '/2.0/?method=album.getInfo&api_key=' + API_KEY + '&mbid=' + detalhesMusica.track.album.mbid + '&format=json'
    }).done(function (resultados) {
        detalhesAlbum = resultados;
        getDetalhesArtista();
    });
}

function getDetalhesArtista() {
    $.ajax({
        url: API_URL + '/2.0/?method=artist.getInfo&api_key=' + API_KEY + '&mbid=' + detalhesMusica.track.artist.mbid + '&format=json'
    }).done(function (resultados) {
        detalhesArtista = resultados;
        showDetalhesMusica();
    });
}

function showDetalhesMusica() {
    $( "#artist-name" ).text(detalhesMusica.track.artist.name);
    $( "#track-name" ).text(detalhesMusica.track.name);
    $( "#artist-photo" ).attr('src', detalhesArtista.artist.image[3]['#text']);
    $( "#album-name" ).text(detalhesAlbum.album.name);
    $( "#album-description" ).text(detalhesAlbum.album.playcount);
    $( "#album-photo" ).attr('src', detalhesAlbum.album.image[3]['#text']);
}
