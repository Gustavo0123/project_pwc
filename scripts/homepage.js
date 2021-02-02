"use strict";

const API_KEY = "5ba1f5ca210bd7e2abd6f9476393c155";
const API_URL = "http://ws.audioscrobbler.com";

var listaTopMusicasPortugal = [];
var listaMusicasEscolhidas = [];
var listaMusicasPesquisa = [];
var mostrarMusicasPesquisa = false;

//funcao chamada no load da pagina
function inicializarHomepage() {
    getTopMusicasPortugal();
    inicializarMusicasEscolhidas();
}

//musicas escolhidas da api
function inicializarMusicasEscolhidas() {
    var musicas = ["1d2a50be-823f-4143-95e2-b84182487d49", "e96855bb-5c68-4349-92bb-7cbc3035a5e3", "93289015-cf8a-4dde-b309-43ccf3803582", "f980fc14-e29b-481d-ad3a-5ed9b4ab6340", "6cbbb97d-2180-4ba9-97a8-6158b6332bb4"];
    for(var i = 0; i < musicas.length; i++){
        getTrack(musicas[i]);
    }
}

//get top de portugal
function getTopMusicasPortugal() {
    $.ajax({
        url: API_URL + '/2.0/?method=geo.gettoptracks&country=portugal&api_key=' + API_KEY + '&format=json&limit=5'
    }).done(function (resultados) {
        listaTopMusicasPortugal = resultados.tracks.track;
        verificaFavoritosTopMusicasPortugal();
        showTopMusicasPortugal();
    });
}

//get musicas escolhidas
function getTrack(key) {
    $.ajax({
        url: API_URL + '/2.0/?method=track.getInfo&api_key=' + API_KEY + '&mbid=' + key + '&format=json'
    }).done(function (resultados) {
        //push - adiciona um elemento ao final do array
        listaMusicasEscolhidas.push(resultados);
        showMusicasEscolhidas();
    });
}


function verificaFavoritosTopMusicasPortugal() {
    for (var i = 0; i < listaTopMusicasPortugal.length; i++){
        var favorito = localStorage.getItem(listaTopMusicasPortugal[i].mbid);
        if (favorito == null){
            listaTopMusicasPortugal[i].favorito = false;
        } else {
            listaTopMusicasPortugal[i].favorito = true;
        }
    }
}

function adicionarFavoritoTopMusicasPortugal(i) {
    var id = listaTopMusicasPortugal[i].mbid;
    localStorage.setItem(id, id);
    listaTopMusicasPortugal[i].favorito = true;
    refreshFavoritoTopMusicasPortugal(i);
}

function removerFavoritoTopMusicasPortugal(i) {
    var id = listaTopMusicasPortugal[i].mbid;
    localStorage.removeItem(id);
    listaTopMusicasPortugal[i].favorito = false;
    refreshFavoritoTopMusicasPortugal(i);
}

//refresh icon favoritos
function refreshFavoritoTopMusicasPortugal(i) {
    var icon;
    if (listaTopMusicasPortugal[i].favorito){
        icon = "<i onclick='removerFavoritoTopMusicasPortugal("+ i +")' class=\"fas fa-star\"></i>";
    } else {
        icon = "<i onclick='adicionarFavoritoTopMusicasPortugal("+ i +")' class=\"far fa-star\"></i>";
    }
    $("#" + listaTopMusicasPortugal[i].mbid).html(icon);
}

function showTopMusicasPortugal() {
    $("#topMusicasPortugalList").ready(function(){
        var musica = '';
        for (var i = 0; i < listaTopMusicasPortugal.length; i++) {
            var icon;
            if (listaTopMusicasPortugal[i].favorito){
                icon = "<i onclick='removerFavoritoTopMusicasPortugal(" + i +")' class=\"fas fa-star\"></i>";
            } else {
                icon = "<i onclick='adicionarFavoritoTopMusicasPortugal(" + i +")' class=\"far fa-star\"></i>";
            }
            //concac string
            //lista de cards a apresentar
            musica +=
                "<div class='card'>" +
                    //"<img class='card-img-top' src=" + topMusicasPortugal[i].image[0]['#text'] + ">" +
                    "<div class='card-body'>" +
                        "<h5 class='card-title'>Nome: " + listaTopMusicasPortugal[i].name + "</h5>" +
                        "<div class='card-text'>" +
                            "Artista: " + listaTopMusicasPortugal[i].artist.name +
                        "</div>" +
                        "<div>" +
                            //album
                        "</div>" +
                    "</div>" +
                    "<a href='../html/detalhes.html' onclick='saveTopMusicasPortugalMbid(" + i + ")' class='btn btn-primary add-fav'>Ver Detalhes</a>" +
                    "<div id=" + listaTopMusicasPortugal[i].mbid + ">" +
                        icon +
                    "</div>" +
                "</div>";
        }
        $("#topMusicasPortugalList").html("<h5 class='list-header'>Top Músicas Portugal</h5><div class='card-columns'>" + musica + "</div>");
    });
}

//guarda o id da musica selecionada para ver os detalhes
function saveTopMusicasPortugalMbid(i) {
    localStorage.setItem("mbid", listaTopMusicasPortugal[i].mbid);
}

function adicionarFavoritoMusicasEscolhidas(i) {
    var id = listaMusicasEscolhidas[i].track.mbid;
    localStorage.setItem(id, id);
    listaMusicasEscolhidas[i].favorito = true;
    refreshFavoritoMusicasEscolhidas(i);
}

function removerFavoritoMusicasEscolhidas(i) {
    var id = listaMusicasEscolhidas[i].track.mbid;
    localStorage.removeItem(id);
    listaMusicasEscolhidas[i].favorito = false;
    refreshFavoritoMusicasEscolhidas(i);
}

function refreshFavoritoMusicasEscolhidas(i) {
    var icon;
    if (listaMusicasEscolhidas[i].favorito){
        icon = "<i onclick='removerFavoritoMusicasEscolhidas("+ i +")' class=\"fas fa-star\"></i>";
    } else {
        icon = "<i onclick='adicionarFavoritoMusicasEscolhidas("+ i +")' class=\"far fa-star\"></i>";
    }
    $("#" + listaMusicasEscolhidas[i].track.mbid).html(icon);
}

function showMusicasEscolhidas() {
    $("#musicasEscolhaList").ready(function(){
        var musica = '';
        for (var i = 0; i < listaMusicasEscolhidas.length; i++) {
            var icon;
            if (listaMusicasEscolhidas[i].favorito){
                icon = "<i onclick='removerFavoritoMusicasEscolhidas(" + i +")' class=\"fas fa-star\"></i>";
            } else {
                icon = "<i onclick='adicionarFavoritoMusicasEscolhidas(" + i +")' class=\"far fa-star\"></i>";
            }
            musica +=
                "<div class='card'>" +
                    //"<img class='card-img-top' src=" + musicasFavoritos[i].image[0]['#text'] + ">" +
                    "<div class='card-body'>" +
                        "<h5 class='card-title'>Nome: " + listaMusicasEscolhidas[i].track.name + "</h5>" +
                        "<div class='card-text'>" +
                            "Artista: " + listaMusicasEscolhidas[i].track.artist.name +
                        "</div>" +
                        "<div>" +
                            //album
                        "</div>" +
                    "</div>" +
                    "<a href='../html/detalhes.html' onclick='saveMusicasEscolhidasMbid(" + i + ")' class='btn btn-primary add-fav'>Ver Detalhes</a>" +
                    "<div id=" + listaMusicasEscolhidas[i].track.mbid + ">" +
                        icon +
                    "</div>" +
                "</div>";
        }
        $("#musicasEscolhaList").html("<h5 class='list-header'>Musicas Escolhidas</h5><div class='card-columns'>" + musica + "</div>");
    });
}


function saveMusicasEscolhidasMbid(i) {
    localStorage.setItem("mbid", listaMusicasEscolhidas[i].track.mbid);
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

//manda o valor do input à API e devolve os dados correspondentes
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
    //verifica se o searchBar tem valor
    if (track === ''){
        mostrarMusicasPesquisa = false;
    } else {
        mostrarMusicasPesquisa = true;
    }
    //se tiver valor renderiza os resultados devolvidos pela pesquisa
    //se não tiver valor renderiza as musica do homepage
    if (mostrarMusicasPesquisa){
        var musica = '';
        for (var i = 0; i < listaMusicasPesquisa.length; i++) {
            var icon;
            if (listaMusicasPesquisa[i].favorito){
                icon = "<i onclick='removerMusicasPesquisa(" + i +")' class='fas fa-star'></i>";
            } else {
                icon = "<i onclick='adicionarMusicasPesquisa(" + i +")' class='far fa-star'></i>";
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
        $("#musicasPesquisalList").html("<h5>Musicas Pesquisa</h5>" + musica);
        $("#topMusicasPortugalList").empty();
        $("#musicasEscolhaList").empty();
    } else {
        $("#musicasPesquisalList").empty();
        inicializarHomepage();
    }
}

function saveMusicasPesquisaMbid(i) {
    localStorage.setItem("mbid", listaMusicasPesquisa[i].mbid);
}
