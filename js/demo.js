

function Change() {
  var i = 1
  inputLength = inputEle.value.split(" ").length - 1
  grammarEle.innerHTML = ""
  noteEle.innerHTML = ""
  if (eval(`json.main.${LANG}.list.command.filter(function(item){return item.name === "/${page.input.getCommandName()} "})`)[0] !== undefined) {
    grammarEle.innerHTML = `<span id="0">${eval(`json.main.${LANG}.list.command.filter(function(item){return item.name === "/${page.input.getCommandName()} "})`)[0].name}</span>`
    noteEle.innerHTML = `<span id="0">${eval(`json.main.${LANG}.list.command.filter(function(item){return item.name === "/${page.input.getCommandName()} "})`)[0].info}</span>`
  } else {
    noteEle.innerHTML = `未知的命令（此命令不存在于 json.main.${LANG}.list 中）`
  }
  function loadGrammar(str) {
    var thisGrammar = grammarEle.querySelectorAll(".grammar:not(.end)")[document.querySelectorAll(".grammar:not(.end)").length - 1] || grammarEle
    if (eval(str.split("[", str.split("[").length - 1).join("[")) !== undefined) {
      if (eval(str.split("[", str.split("[").length - 1).join("[")).length > 1) {
        for (var e = 0; e < eval(str.split("[", str.split("[").length - 1).join("[")).length; e++) {
          str = str.split("[", str.split("[").length - 1).join("[") + `[${e}]`
          thisGrammar.innerHTML += `<span id="${i}" class="grammar" style="display: none;">${eval(`${str}.text`)} </span>`
          noteEle.innerHTML += `<span id="${i}" style="display: none;">${eval(`${str}.note`)}</span>`
          i++
          loadGrammar(`${str}.next[0]`)
        }
      } else if (eval(str) !== "End") {
        thisGrammar.innerHTML += `<span id="${i}" class="grammar end" style="display: none;">${eval(`${str}.text`)} </span>`
        noteEle.innerHTML += `<span id="${i}" style="display: none;">${eval(`${str}.note`)}</span>`
        i++
        loadGrammar(`${str}.next[0]`)
      }
    } else {
      noteEle.innerHTML = `未知的命令（此命令不存在于 json.main.${LANG}.grammar 中）`
    }
    function display(str) {
      eval(`${str}.style.display = ""`)
      eval(`${str}.style.fontWeight = "normal"`)
      display(str + ".querySelector('span.grammar:not(.end)')")
    }
    // display("grammarEle.querySelector('span.grammar:not(.end)')")
    if (grammarEle.querySelectorAll("span:not([style='display: none;'])")[inputLength] !== undefined) {
      grammarEle.querySelectorAll("span:not([style='display: none;'])")[inputLength].style.fontWeight = "bold"
      for (var x = 0; x < noteEle.querySelectorAll("span").length; x++) {
        noteEle.querySelectorAll("span")[x].style.display = "none"
      }
      noteEle.querySelector(`[id="${grammarEle.querySelectorAll("span:not([style='display: none;'])")[inputLength].id}"]`).style.display = "" //待改
    }
  }
  loadGrammar(`json.main.${LANG}.grammar.${page.input.getCommandName()}[0]`)
}

Change()
