"use strict";

const API_KEY = "5ba1f5ca210bd7e2abd6f9476393c155";
const API_URL = "http://ws.audioscrobbler.com";

var listaTopMusicasPortugal = [];
var listaMusicasEscolhidas = [];

function inicializarHomepage() {
    getTopMusicasPortugal();
    inicializarMusicasEscolhidas();
}

function inicializarMusicasEscolhidas() {
    var musicas = ["1d2a50be-823f-4143-95e2-b84182487d49", "e96855bb-5c68-4349-92bb-7cbc3035a5e3", "93289015-cf8a-4dde-b309-43ccf3803582", "f980fc14-e29b-481d-ad3a-5ed9b4ab6340", "6cbbb97d-2180-4ba9-97a8-6158b6332bb4"];
    for(var i = 0; i < musicas.length; i++){
        getTrack(musicas[i]);
    }
}

function getTopMusicasPortugal() {
    $.ajax({
        url: API_URL + '/2.0/?method=geo.gettoptracks&country=portugal&api_key=' + API_KEY + '&format=json&limit=5'
    }).done(function (resultados) {
        listaTopMusicasPortugal = resultados.tracks.track;
        showTopMusicasPortugal();
    });
}

function getTrack(key) {
    $.ajax({
        url: API_URL + '/2.0/?method=track.getInfo&api_key=' + API_KEY + '&mbid=' + key + '&format=json'
    }).done(function (resultados) {
        listaMusicasEscolhidas.push(resultados);
        showMusicasEscolhidas();
    });
}

function showTopMusicasPortugal() {
    $("#topMusicasPortugalList").ready(function(){
        var musica = '';
        for (var i = 0; i < listaTopMusicasPortugal.length; i++) {
            musica +=
                "<li class='list-group-item'>Nome: " + listaTopMusicasPortugal[i].name + "</li>" +
                "<a href='../html/detalhes.html' onclick='saveTopMusicasPortugalMbid(" + i + ")' class='btn btn-primary add-fav'>Ver Detalhes</a>"
        }
        $("#topMusicasPortugalList").html("<h5>Top musicas portugal</h5><ul class='list-group'>" + musica + "</ul>");
    });
}

function showMusicasEscolhidas() {
    $("#musicasEscolhaList").ready(function(){
        var musica = '';
        for (var i = 0; i < listaMusicasEscolhidas.length; i++) {
            musica +=
                "<li class='list-group-item'>Nome: " + listaMusicasEscolhidas[i].track.name + "</li>" +
                "<a href='../html/detalhes.html' onclick='saveMusicasEscolhidasMbid(" + i + ")' class='btn btn-primary add-fav'>Ver Detalhes</a>"
        }
        $("#musicasEscolhaList").html("<h5>Musicas</h5><ul class='list-group'>" + musica + "</ul>");
    });
}

function saveTopMusicasPortugalMbid(i) {
    localStorage.setItem("mbid", listaTopMusicasPortugal[i].mbid);
    console.log(i);
    console.log(listaTopMusicasPortugal[i].mbid);
}

function saveMusicasEscolhidasMbid(i) {
    localStorage.setItem("mbid", listaMusicasEscolhidas[i].track.mbid);
}