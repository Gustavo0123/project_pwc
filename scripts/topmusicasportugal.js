"use strict";
const API_KEY = "5ba1f5ca210bd7e2abd6f9476393c155";
const API_URL = "http://ws.audioscrobbler.com";

var topMusicasPortugal;

function getTopMusicasPortugal() {
    $.ajax({
        url: API_URL + '/2.0/?method=geo.gettoptracks&country=portugal&api_key=' + API_KEY + '&format=json'
    }).done(function (resultados) {
        topMusicasPortugal = resultados.tracks.track;
        showTopMusicasPortugal();
    });
}

function showTopMusicasPortugal() {
    $("#topMusicasPortugalList").ready(function(){
        for (var i = 0; i < topMusicasPortugal.length; i++) {
            var musica =
                "<div class='card' >" +
                    "<img class='card-img-top' src=" + topMusicasPortugal[i].image[0]['#text'] + ">" +
                    "<div class='card-body'>" +
                        "<h5 class='card-title'>Nome: " + topMusicasPortugal[i].name + "</h5>" +
                        "<div class='card-text'>" +
                            "Artista: " + topMusicasPortugal[i].artist.name +
                        "</div>" +
                        "<div>" +
                        //album
                        "</div>" +
                    "</div>" +
                    "<a href='../html/detalhes.html' onclick='saveMbid(" + i + ")' class='btn btn-primary stretched-link add-fav'>Ver Detalhes</a>"
                "</div>"
            $("#topMusicasPortugalList").append(musica)
        }
    });
}

function saveMbid(i) {
    sessionStorage.setItem("mbid", topMusicasPortugal[i].mbid);
}
