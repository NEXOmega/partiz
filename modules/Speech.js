const say = require('say')

function speech(text) {
        say.speak(text, "Julie", 1.2)
}

module.exports = {
    speech
}