var regex = /(?<=\[)(.*?)(?=\])/

function formatGage(player, players, gage) {
    var players = Object.keys(players)
    if(gage.includes("%p"))
        gage = gage.replace("%p",player)

    if(gage.includes("%rn")){
        var regexrn = /(?<=%rn\[)(.*?)(?=\])/
        var interval = regexrn.exec(gage)[0].split(',')
        gage = gage.replace(`%rn[${regex.exec(gage)[0]}]`, randomIntFromInterval(interval[0], interval[1]))
    }
    if(gage.includes("%ri")){
        var regexri = /(?<=%ri\[)(.*?)(?=\])/
        gage = gage.replace(`%ri[${regexri.exec(gage)[0]}]`, difficulties[regexri.exec(gage)[0]].images[Math.floor(Math.random() * difficulty.images.length)])
    }
    if(gage.includes("%rp")) {
        players = players.remove(player)
        gage = gage.replace("%rp", players[Math.floor(Math.random() * players.length)])
    }
    return gage

}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) { 
    for(var i=0; i < this.length; i++) { 
        if(comparer(this[i])) return true; 
    }
    return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

module.exports = {
    formatGage
}