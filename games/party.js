const speech = require("../modules/Speech")
const table = require("table")
const jsonToTable = require("json-to-table")

const players = {}
var highest_player = {points:-1000}
function add_player(name) {
    players[name] = {
        name: name,
        points: 0
    }
    return players[name]
}

function add_points(name, number) {
    players[name].points += number
}

function get_highest_score() {
    Object.keys(players).forEach(player => {
        if(players[player].points > highest_player.points)
            highest_player = players[player]
    });
    if(highest_player.name != null) 
        speech.speech(`Le plus haut joueur actuellement est ${highest_player.name} avec ${highest_player.points} Point.`)
}

function show_points() {
    console.log(table.table(jsonToTable(players)))
}

function get_winner() {
    let winner = {points:-1000};
    let equality = []
    Object.keys(players).forEach(player => {
        if(players[player].points > winner.points)
            winner = players[player]
    });

    Object.keys(players).forEach(player => {
        if(players[player].points == winner.points)
            equality.push(player)
    });
    return equality
}

module.exports = {
    add_player,
    add_points,
    get_highest_score,
    show_points,
    get_winner,
    players
}