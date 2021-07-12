var request1 = new XMLHttpRequest()
var sound
request1.open("get", "./sound.json")// from 
request1.send(null)
request1.onload = function() {
    if (request1.status == 200) {
        sound = JSON.parse(request1.responseText)
    }
}
var request2 = new XMLHttpRequest()
var sound_edu
request2.open("get", "./sound_edu.json")// from 
request2.send(null)
request2.onload = function() {
    if (request2.status == 200) {
        sound_edu = JSON.parse(request2.responseText)
    }
}
var request3 = new XMLHttpRequest()
var sound_115
request3.open("get", "./sound_115.json")// from 
request3.send(null)
request3.onload = function() {
    if (request3.status == 200) {
        sound_115 = JSON.parse(request3.responseText)
    }
}
var request4 = new XMLHttpRequest()
var sound_cave
request4.open("get", "./sound_cave.json")// from 
request4.send(null)
request4.onload = function() {
    if (request4.status == 200) {
        sound_cave = JSON.parse(request4.responseText)
    }
}

var arr = new Array
setTimeout(() => {
    for (var i in sound) {
        arr.push({
            "name": i.toLowerCase(),
            "info": "",
            "url": "info",
            "add": "default"
        })
    }
    for (var i in sound_115) {
        arr.push({
            "name": i.toLowerCase(),
            "info": "",
            "url": "info",
            "add": "default"
        })
    }
    for (var i in sound_cave.sound_definitions) {
        arr.push({
            "name": i.toLowerCase(),
            "info": "[仅实验性玩法]",
            "url": "info",
            "add": "default"
        })
    }
    for (var i in sound_edu) {
        arr.push({
            "name": i.toLowerCase(),
            "info": "[仅教育版]",
            "url": "info",
            "add": "default"
        })
    }
    (function () {
        var blob = new Blob([JSON.stringify(arr)], {type: 'application/json'});
        var link = document.querySelector("a")
        link.download = "main.list.block.json"
        link.href = URL.createObjectURL(blob)
    })()
}, 1000)