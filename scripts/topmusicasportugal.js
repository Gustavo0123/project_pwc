"use strict";
const API_KEY = "5ba1f5ca210bd7e2abd6f9476393c155";
const API_URL = "http://ws.audioscrobbler.com";

var topMusicasPortugal;
var listaMusicasPesquisa = [];
var mostrarMusicasPesquisa = false;

function getTopMusicasPortugal() {
    $.ajax({
        url: API_URL + '/2.0/?method=geo.gettoptracks&country=portugal&api_key=' + API_KEY + '&format=json'
    }).done(function (resultados) {
        topMusicasPortugal = resultados.tracks.track;
        verificaFavoritos();
        showTopMusicasPortugal();
    });
}

function verificaFavoritos() {
    for (var i = 0; i < topMusicasPortugal.length; i++){
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

function showTopMusicasPortugal() {
    $("#topMusicasPortugalList").ready(function(){
        for (var i = 0; i < topMusicasPortugal.length; i++) {
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
//navegar para a pagina dos detalhes
//guarda o id da musica selecionada
function saveMbid(i) {
    localStorage.setItem("mbid", topMusicasPortugal[i].mbid);
}

function saveMusicasPesquisaMbid(i) {
    localStorage.setItem("mbid", listaMusicasPesquisa[i].mbid);
}

function adicionarMusicasPesquisa(i) {
    var id = listaMusicasPesquisa[i].mbid;
    localStorage.setItem(id, id);
    listaMusicasPesquisa[i].favorito = true;
    refreshMusicasPesquisa(i);
}

function removerMusicasPesquisa(i) {
    var id = listaMusicasPesquisa[i].mbid;
    localStorage.removeItem(id);
    listaMusicasPesquisa[i].favorito = false;
    refreshMusicasPesquisa(i);
}

function refreshMusicasPesquisa(i) {
    var icon;
    if (listaMusicasPesquisa[i].favorito){
        icon = "<i onclick='removerMusicasPesquisa("+ i +")' class=\"fas fa-star\"></i>";
    } else {
        icon = "<i onclick='adicionarMusicasPesquisa("+ i +")' class=\"far fa-star\"></i>";
    }
    $("#" + listaMusicasPesquisa[i].mbid).html(icon);
}


function search() {
    var track = $("#pesquisa").val();
    $.ajax({
        url: API_URL + '/2.0/?method=track.search&track=' + track + '&api_key='+  API_KEY + '&format=json'
    }).done(function (resultados) {
        listaMusicasPesquisa = resultados.results.trackmatches.track;
        verificaPesquisaFavoritos();
        refreshHomepage();
    });
}

function verificaPesquisaFavoritos() {
    for (var i = 0; i < listaMusicasPesquisa.length; i++){
        var favorito = localStorage.getItem(listaMusicasPesquisa[i].mbid);
        if (favorito == null){
            listaMusicasPesquisa[i].favorito = false;
        } else {
            listaMusicasPesquisa[i].favorito = true;
        }
    }
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
                icon = "<i onclick='removerMusicasPesquisa(" + i +")' class=\"fas fa-star\"></i>";
            } else {
                icon = "<i onclick='adicionarMusicasPesquisa(" + i +")' class=\"far fa-star\"></i>";
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
        $("#topMusicasPortugalList").empty();
    } else {
        $("#musicasPesquisalList").empty();
        getTopMusicasPortugal();
    }
}
