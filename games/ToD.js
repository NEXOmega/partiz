const data = require("../data/games/ToD")
const inquirer = require("inquirer")

function select(difficulty, category) {
    var acts =  data[difficulty][category]
    const randomact = Math.floor(Math.random() * acts.length)
    
    return acts[randomact]
}

function game_menu(difficulty, player, players) {
    return new Promise((reseolve, reject) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Action Ou Vérité ?',
                choices: [
                  'Action',
                  'Vérité',
                ],
                filter: function (val) {
                    if(val == "Action")
                        return "dare"
                    else
                        return "truth"
                },
              }
            ]).then(answer => {
                var gage = require("../modules/utils").formatGage(player, players, select(difficulty, answer.choice))
                require("../modules/Speech").speech(gage)
                console.log(gage)
                inquirer.prompt([
                    {
                        type:"list",
                        name:"did",
                        message: "Le gage a t-il été fait ?",
                        choices: [
                            "Oui",
                            "Non"
                        ]
                    }
                ]).then(result => {
                    if(result.did == "Oui") {
                        require("./game").party.add_points(player, 2)
                        /*if(answer.choice == "truth")
                            require("./game").party.add_points(player, 1)
                        else
                            require("./game").party.add_points(player, 2)*/
                    }
                    else if(result.did == "Non")
                        require("./game").party.add_points(player, -1)
                    reseolve("done")
                })
            })
            
    })
}

module.exports = {
    select,
    game_menu
}