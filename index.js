const game = require("./games/game")
const inquirer= require("inquirer")

const STATE = {
    INIT:"init",
    PLAYING:"playing",
    END:"ending"
}

var current_state = STATE.INIT;
var turns = 2
var difficulty = 1

function init() {
    inquirer
  .prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What do you want to do?',
      choices: [
        'Add Player',
        'Set Difficulty',
        'Set Turns',
        'Start Game'
      ],
    }
  ])
  .then((answer) => {
      if(answer.choice == 'Add Player') {
          inquirer.prompt([
              {
                  type: 'input',
                  name: 'player_name',
                  message: `Player Name`
              }
          ]).then(name => {game.party.add_player(name.player_name); init()})
      } else if(answer.choice == 'Set Difficulty') {
        inquirer.prompt([
            {
                type: 'input',
                name: 'number',
                message: `Set Difficulty`
            }
        ]).then(difficulty => {game.party.add_player(difficulty.number); init()})
      } else if(answer.choice == 'Set Turns') {
        inquirer.prompt([
            {
                type: 'input',
                name: 'number',
                message: `Set Turns`
            }
        ]).then(turns => {game.party.add_player(turns.number); init()})
      } else {
          game.init_game(turns, difficulty)
      }
  });
}

init()