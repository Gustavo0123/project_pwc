"use strict";
const API_KEY = "5ba1f5ca210bd7e2abd6f9476393c155";
const API_URL = "http://ws.audioscrobbler.com";

var musicasFavoritos = [];

function removerFavorito(i) {
    localStorage.removeItem(musicasFavoritos[i].track.mbid);
    musicasFavoritos.splice(i, 1);
    refreshFavoritos();
}

function refreshFavoritos() {
    $("#favoritosList").empty();
    showFavoritos();
}

function inicializarFavoritos() {
    var listLocalStorage = Object.keys(localStorage);
    for (var i = 0; i < listLocalStorage.length; i++) {
        if (listLocalStorage[i] !== 'mbid') {
            getTrack(listLocalStorage[i]);
        }
    }
}

function showFavoritos() {
    $("#favoritosList").ready(function(){
        var musica = '';
        for (var i = 0; i < musicasFavoritos.length; i++) {
            var icon = "<i onclick='removerFavorito(" + i +")' class=\"fas fa-trash\"></i>";
            musica +=
                "<div class='card' >" +
                //"<img class='card-img-top' src=" + musicasFavoritos[i].image[0]['#text'] + ">" +
                "<div class='card-body'>" +
                "<h5 class='card-title'>Nome: " + musicasFavoritos[i].track.name + "</h5>" +
                "<div class='card-text'>" +
                "Artista: " + musicasFavoritos[i].track.artist.name +
                "</div>" +
                "<div>" +
                //album
                "</div>" +
                "</div>" +
                "<a href='../html/detalhes.html' onclick='saveMbid(" + i + ")' class='btn btn-primary add-fav'>Ver Detalhes</a>" +
                "<div id=" + musicasFavoritos[i].track.mbid + ">" +
                icon +
                "</div>" +
            "</div>";
        }
        $("#favoritosList").html(musica);
    });
}

function saveMbid(i) {
    localStorage.setItem("mbid", musicasFavoritos[i].track.mbid);
}

function getTrack(key) {
    $.ajax({
        url: API_URL + '/2.0/?method=track.getInfo&api_key=' + API_KEY + '&mbid=' + localStorage.getItem(key) + '&format=json'
    }).done(function (resultados) {
        musicasFavoritos.push(resultados);
        showFavoritos();
    });
}

