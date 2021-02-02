"use strict";
const API_KEY = "5ba1f5ca210bd7e2abd6f9476393c155";
const API_URL = "http://ws.audioscrobbler.com";

var musicasFavoritos = [];
var listaMusicasPesquisa = [];
var mostrarMusicasPesquisa = false;

function removerFavorito(i) {
    localStorage.removeItem(musicasFavoritos[i].track.mbid);
    //splice - remove do array(posicao a remover)
    musicasFavoritos.splice(i, 1);
    refreshFavoritos();
}

function refreshFavoritos() {
    $("#favoritosList").empty();
    showFavoritos();
    alertFavoritos();
}

function inicializarFavoritos() {
    //busca todas as key do que esta guardado no localStorage
    var listLocalStorage = Object.keys(localStorage);
    alertFavoritos();
    for (var i = 0; i < listLocalStorage.length; i++) {
        if (listLocalStorage[i] !== 'mbid') {
            getTrack(listLocalStorage[i]);
        }
    }
}

function showFavoritos() {
    $("#favoritosList").ready(function () {
        var musica = '';
        for (var i = 0; i < musicasFavoritos.length; i++) {
            var icon = "<i onclick='removerFavorito(" + i + ")' class=\"fas fa-trash\"></i>";
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

function saveMusicasPesquisaMbid(i) {
    localStorage.setItem("mbid", listaMusicasPesquisa[i].mbid);
}

function adicionarMusicasPesqeuisa(i) {
    var id = listaMusicasPesquisa[i].mbid;
    localStorage.setItem(id, id);
    listaMusicasPesquisa[i].favorito = true;
    refreshMusicasPesqeuisa(i);
}

function removerMusicasPesqeuisa(i) {
    var id = listaMusicasPesquisa[i].mbid;
    localStorage.removeItem(id);
    listaMusicasPesquisa[i].favorito = false;
    refreshMusicasPesqeuisa(i);
}

function refreshMusicasPesqeuisa(i) {
    var icon;
    if (listaMusicasPesquisa[i].favorito){
        icon = "<i onclick='removerMusicasPesqeuisa("+ i +")' class=\"fas fa-star\"></i>";
    } else {
        icon = "<i onclick='adicionarMusicasPesqeuisa("+ i +")' class=\"far fa-star\"></i>";
    }
    $("#" + listaMusicasPesquisa[i].mbid).html(icon);
}

function verificaFavoritosPesquisa() {
    for (var i = 0; i < listaMusicasPesquisa.length; i++){
        var favorito = localStorage.getItem(listaMusicasPesquisa[i].mbid);
        if (favorito == null){
            listaMusicasPesquisa[i].favorito = false;
        } else {
            listaMusicasPesquisa[i].favorito = true;
        }
    }
}

function search() {
    var track = $("#pesquisa").val();
    $.ajax({
        url: API_URL + '/2.0/?method=track.search&track=' + track + '&api_key='+  API_KEY + '&format=json'
    }).done(function (resultados) {
        listaMusicasPesquisa = resultados.results.trackmatches.track;
        verificaFavoritosPesquisa();
        refreshHomepage();
    });
}

function refreshHomepage() {
    var track = $("#pesquisa").val();
    if (track === ''){
        mostrarMusicasPesquisa = false;
    } else {
        mostrarMusicasPesquisa = true;
    }
    if (mostrarMusicasPesquisa){
        var musica = '';
        for (var i = 0; i < listaMusicasPesquisa.length; i++) {
            var icon;
            if (listaMusicasPesquisa[i].favorito){
                icon = "<i onclick='removerMusicasPesqeuisa(" + i +")' class=\"fas fa-star\"></i>";
            } else {
                icon = "<i onclick='adicionarMusicasPesqeuisa(" + i +")' class=\"far fa-star\"></i>";
            }
            musica +=
                "<div class='card'>" +
                    //"<img class='card-img-top' src=" + musicasFavoritos[i].image[0]['#text'] + ">" +
                    "<div class='card-body'>" +
                        "<h5 class='card-title'>Nome: " + listaMusicasPesquisa[i].name + "</h5>" +
                        "<div class='card-text'>" +
                            "Artista: " + listaMusicasPesquisa[i].artist +
                        "</div>" +
                        "<div>" +
                        //a api não disponibilizava do album no search
                            "Url: " + listaMusicasPesquisa[i].url +
                        "</div>" +
                    "</div>" +
                    "<a href='../html/detalhes.html' onclick='saveMusicasPesquisaMbid(" + i + ")' class='btn btn-primary add-fav'>Ver Detalhes</a>" +
                    "<div id=" + listaMusicasPesquisa[i].mbid + ">" +
                        icon +
                    "</div>" +
                "</div>";
        }
        $("#musicasPesquisalList").html("<h5>Musicas Pequisa</h5>" + musica);
        $("#favoritosList").empty();
    } else {
        $("#musicasPesquisalList").empty();
        inicializarFavoritos();
    }
}
function alertFavoritos(){
    var listLocalStorage = Object.keys(localStorage);
    if(listLocalStorage.length === 0 || (listLocalStorage.length === 1 && listLocalStorage[0] === "mbid" )){
        alert("Não tens nenhuma musica adicionada aos Favoritos!!!");
    }
}

