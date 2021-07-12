var request = new XMLHttpRequest()
var blocks
request.open("get", "./blocks.json")// from /assets/resource_packs/vanilla/blocks.json
request.send(null)
request.onload = function() {
    if (request.status == 200) {
        block = JSON.parse(request.responseText)
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
    (function () {
        var blob = new Blob([JSON.stringify(arr)], {type: 'application/json'});
        var link = document.querySelector("a")
        link.download = "main.list.block.json"
        link.href = URL.createObjectURL(blob)
    })()
}, 1000)