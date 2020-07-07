const tod = require("./ToD")
const party = require("./party")
const { players } = require("./party")

async function init_game(turns, difficulty){
    
    for(let turn = 1; turn <= turns; turn++) {
        party.show_points()
        require("../modules/Speech").speech("Nous sommes au tour " + turn)
        await sleep(2000)
        party.get_highest_score()
        await sleep(3000)
        for(let pturn = 0; Object.keys(players).length > pturn; pturn++) {
            if(pturn == Object.keys(players).length) {
                pturn = 0
            }
            require("../modules/Speech").speech(`Au tour de ${Object.keys(players)[pturn]}`)
            await tod.game_menu(difficulty, Object.keys(players)[pturn], players)
        }
        if(turns == turn) {
            require("../modules/Speech").speech("Fin du jeu, faisons le compte des points" +
            (party.get_winner().length == 1 ? `Le gagnant est ${party.get_winner().toString()}, il a donc droit a un voeu` : `Les gagnants sont ${party.get_winner().join(', ')}, departagez vous pour le voeu`))
            console.log(party.get_winner())
        }
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
module.exports = {
    tod,
    party,
    init_game
}