"use strict";
const API_KEY = "5ba1f5ca210bd7e2abd6f9476393c155";
const API_URL = "http://ws.audioscrobbler.com";

var topMusicasPortugal;

function getTopMusicasPortugal() {
    $.ajax({
        url: API_URL + '/2.0/?method=geo.gettoptracks&country=portugal&api_key=' + API_KEY + '&format=json'
    }).done(function (resultados) {
        topMusicasPortugal = resultados.tracks.track;
        verificaFavoritos();
        inicializarTopMusicasPortugal();
    });
}

function verificaFavoritos() {
    for (var i = 0; i < topMusicasPortugal.length - 1; i++){
        var favorito = localStorage.getItem(topMusicasPortugal[i].mbid);
        if (favorito == null){
            topMusicasPortugal[i].favorito = false;
        } else {
            topMusicasPortugal[i].favorito = true;
        }
    }
}

function adicionarFavorito(i) {
    var id = topMusicasPortugal[i].mbid;
    localStorage.setItem(id, id);
    topMusicasPortugal[i].favorito = true;
    refreshFavorito(i);
}

function removerFavorito(i) {
    var id = topMusicasPortugal[i].mbid;
    localStorage.removeItem(id);
    topMusicasPortugal[i].favorito = false;
    refreshFavorito(i);
}

function refreshFavorito(i) {
    var icon;
    if (topMusicasPortugal[i].favorito){
        icon = "<i onclick='removerFavorito("+ i +")' class=\"fas fa-star\"></i>";
    } else {
        icon = "<i onclick='adicionarFavorito("+ i +")' class=\"far fa-star\"></i>";
    }
    $("#" + topMusicasPortugal[i].mbid).html(icon);
}

function inicializarTopMusicasPortugal() {
    $("#topMusicasPortugalList").ready(function(){
        for (var i = 0; i < topMusicasPortugal.length - 1; i++) {
            var icon;
            if (topMusicasPortugal[i].favorito){
                icon = "<i onclick='removerFavorito(" + i +")' class=\"fas fa-star\"></i>";
            } else {
                icon = "<i onclick='adicionarFavorito(" + i +")' class=\"far fa-star\"></i>";
            }
            var musica =
                "<div class='card'>" +
                    //"<img class='card-img-top' src=" + topMusicasPortugal[i].image[0]['#text'] + ">" +
                    "<div class='card-body'>" +
                        "<h5 class='card-title'>Nome: " + topMusicasPortugal[i].name + "</h5>" +
                        "<div class='card-text'>" +
                            "Artista: " + topMusicasPortugal[i].artist.name +
                        "</div>" +
                        "<div>" +
                        //album
                        "</div>" +
                    "</div>" +
                    "<a href='../html/detalhes.html' onclick='saveMbid(" + i + ")' class='btn btn-primary add-fav'>Ver Detalhes</a>" +
                    "<div id=" + topMusicasPortugal[i].mbid + ">" +
                        icon +
                    "</div>" +
                "</div>";
            $("#topMusicasPortugalList").append(musica);
        }
    });
}

function saveMbid(i) {
    localStorage.setItem("mbid", topMusicasPortugal[i].mbid);
}
