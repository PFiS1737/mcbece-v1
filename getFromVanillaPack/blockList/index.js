var request1 = new XMLHttpRequest()
var block
request1.open("get", "./block.json")// from 
request1.send(null)
request1.onload = function() {
    if (request1.status == 200) {
        block = JSON.parse(request1.responseText)
    }
}
var request2 = new XMLHttpRequest()
var block_edu
request2.open("get", "./block_edu.json")// from 
request2.send(null)
request2.onload = function() {
    if (request2.status == 200) {
        block_edu = JSON.parse(request2.responseText)
    }
}
var request3 = new XMLHttpRequest()
var block_cave
request3.open("get", "./block_cave.json")// from 
request3.send(null)
request3.onload = function() {
    if (request3.status == 200) {
        block_cave = JSON.parse(request3.responseText)
    }
}

var arr = new Array
setTimeout(() => {
    for (var i in block) {
        arr.push({
            "name": i.toLowerCase(),
            "info": "",
            "url": "info",
            "add": "default"
        })
    }
    for (var i in block_cave) {
        arr.push({
            "name": i.toLowerCase(),
            "info": "[仅实验性玩法]",
            "url": "info",
            "add": "default"
        })
    }
    for (var i in block_edu) {
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