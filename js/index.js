const inputEle = document.querySelector('#edit')
const grammarEle = document.querySelector("#grammar")
const noteEle = document.querySelector("#note")
const listEle = document.querySelector("#list")
const wikiEle = document.querySelector("#wiki")
const copyEle = document.querySelector("#copy")

let LANG = ""

const page = {
    language: {
        zh: "中文（简体）"
    },
    json: {
        main: {
            zh: {}
        },
        custom: {}
    },
    text: {
        url: {
            command_page: {
                zh: "https://minecraft.fandom.com/zh/wiki/命令"
            },
            normal_page: {
                zh: "https://minecraft.fandom.com/zh/wiki/"
            },
            search_page: {
                zh: "https://minecraft.fandom.com/zh/wiki/Special:搜索?search="
            }
        },
        inputText: {
            zh: "开始编写"
        },
        beginText: {
            zh: "输入任何内容开始编写"
        },
        endText: {
            zh: "已完成编写"
        }
    },
    change: function () {
        var commandLength = inputEle.value.split(" ").length
        this.edit.begin()
        if (inputEle.value === "") return
        this.grammarEle.load()
        if (grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1] !== undefined) {
            this.listEle.load(`${grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1].getAttribute("data-grammar-cammand-list")}`)
        }
        this.edit.finish()
    },
    inputEle: {
        add: function (text, isReplaceAll) {
            if (isReplaceAll === true) {
                inputEle.value = ""
            } else {
                inputEle.value = inputEle.value.split(" ", inputEle.value.split(" ").length - 1).join(" ") + " "
            }
            inputEle.value += text
        },
        copy: function (request) {
            if (request === "copy") {
                inputEle.select()
                inputEle.setSelectionRange(0, inputEle.value.length)
                document.execCommand('copy')
                mdui.snackbar({
                    message: "已复制",
                    position: "left-top",
                    timeout: 2000,
                    closeOnOutsideClick: false
                })
            } else if (request === "display") {
                if (listEle.getAttribute("data-edit-finished") == "true") {
                    wikiEle.style.display = "none"
                    copyEle.style.display = ""
                } else {
                    wikiEle.style.display = ""
                    copyEle.style.display = "none"
                }
            }
        },
        getCommandName: function () {
            var commandName = inputEle.value.split(" ")[0]
            if (commandName === "") {
                return "undefined"
            } else {
                return inputEle.value.split(" ")[0].split("/")[1]
            }
        },
        getParameterByLength: function (length) {
            if (length === "theLatest") {
                return inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]
            } else {
                return inputEle.value.split(" ")[length]
            }
        }
    },
    edit: {
        begin: function () {
            var commandLength = inputEle.value.split(" ").length
            wikiEle.href = eval(`page.text.url.command_page.${LANG}`) + inputEle.value.split(" ")[0]
            listEle.setAttribute("data-edit-finished", "false")
            page.inputEle.copy("display")
            if (commandLength === 1) {
                page.listEle.load("command")
            }
            if (inputEle.value === "") {
                grammarEle.innerHTML = ""
                noteEle.innerHTML = eval(`page.text.beginText.${LANG}`)
            }
        },
        finish: function () {
            if (listEle.getAttribute("data-edit-finished") === "true") {
                listEle.innerHTML = ""
                grammarEle.innerHTML = ""
                noteEle.innerHTML = eval(`page.text.endText.${LANG}`)
                listEle.setAttribute("data-list-name", "none")
                page.inputEle.copy("display")
            }
        }
    },
    listEle: {
        getListName: function (model) {
            var listName = listEle.getAttribute("data-list-name")
            if (model === "display") {
                for (var i = 0; i < document.querySelectorAll("#getListName").length; i++) {
                    document.querySelectorAll("#getListName")[i].innerHTML = listName
                }
            } else if (typeof model === undefined) {
                return listName
            }
        },
        load: function (listName) {
            if (listEle.getAttribute("data-list-name") !== `${listName}`) {
                function displayListImage(i, listName, dataName) {
                    if (eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].image`) === undefined || eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].image`) === "" || eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].image`) === "none") {
                        return ""
                    } else {
                        return `<div class="mdui-list-item-avatar"><img src="${eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].image`)}"/></div>`
                    }
                }
                function displayListAddFunction(i, listName, dataName) {
                    if (eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].add`) !== undefined) {
                        var output = {
                            text: "",
                            isWithoutReload: ""
                        }
                        var rule = eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].add.rule`)
                        var text = eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].add.text`)
                        if (text === "none" || text === undefined) {
                            output.text = ""
                        } else if (text === "name") {
                            output.text = eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].name`)
                        } else if (text === "info") {
                            output.text = eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].info`)
                        }
                        for (var i = 0; i < rule.length; i++) {
                            if (rule[i] === "replace_all") {
                                output.isReplaceAll = true
                            } else if (rule[i] === "with_space_after") {
                                output.text += " "
                            }
                        }
                        return `page.inputEle.add('${output.text}', ${output.isReplaceAll})`
                    } else {
                        return "page.inputEle.add('',)"
                    }
                }
                function displayListName(i, listName, dataName) {
                    if (eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].name`) === undefined) {
                        console.error(`列表 ${listName} 中，第 ${i} 项的“name” 是必须的。`)
                    } else {
                        return eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].name`)
                    }
                }
                function displayListInfo(i, listName, dataName) {
                    if (eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].info`) === undefined) {
                        return ""
                    } else {
                        return eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].info`)
                    }
                }
                function displayListURL(i, listName, dataName) {
                    if (eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].url`) !== undefined) {
                        var output
                        this.page = eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].url.page`)
                        this.text = eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].url.text`)
                        if (this.page === "none" || this.page === "" || this.page === undefined) {
                            return ""
                        } else if (this.page === "command_page") {
                            output = eval(`page.text.url.command_page.${LANG}`)
                        } else if (this.page === "normal_page") {
                            output = eval(`page.text.url.normal_page.${LANG}`)
                        }  else if (this.page === "search_page") {
                            output = eval(`page.text.url.search_page.${LANG}`)
                        } else if (this.page === "custom") {
                            return `<a class="mdui-btn mdui-btn-icon mdui-list-item-display-when-hover" href="${this.text}" target="_blank" id="listURL"><i class="mdui-icon material-icons mdui-text-color-black-icon">send</i></a>`
                        }
                        if (this.text === "none" || this.text === undefined) {
                            output += ""
                        } else if (this.text === "name") {
                            output += eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].name`)
                        } else if (this.text === "info") {
                            output += eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].info`)
                        }
                        return `<a class="mdui-btn mdui-btn-icon mdui-list-item-display-when-hover" href="${output}" target="_blank" id="listURL"><i class="mdui-icon material-icons mdui-text-color-black-icon">send</i></a>`
                    } else {
                        return ""
                    }
                }
                if (eval(`page.json.main.${LANG}`) !== undefined) {
                    if (eval(`page.json.main.${LANG}.list`) !== undefined) {
                        if (eval(`page.json.main.${LANG}.list.${listName}`) !== undefined) {
                            listEle.innerHTML = ""
                            listEle.setAttribute("data-list-name", `${listName}`)
                            for (var i = 0; i < eval(`page.json.main.${LANG}.list.${listName}.length`); i++) {
                                listEle.innerHTML += `
                <li class="mdui-list-item mdui-ripple" id="${i}">
                    ${displayListImage(i, listName, "main")}
                    <div class="mdui-list-item-content" onclick="${displayListAddFunction(i, listName, "main")}; page.change()">
                        <div class="mdui-list-item-title" id="listName">${displayListName(i, listName, "main")}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line" id="listInfo">${displayListInfo(i, listName, "main")}</div>
                    </div>
                    ${displayListURL(i, listName, "main")}
                </li>`
                            }
                        }
                    }
                }
                if (eval(`page.json.custom.${LANG}`) !== undefined) {
                    if (eval(`page.json.custom.${LANG}.list`) !== undefined) {
                        if (eval(`page.json.custom.${LANG}.list.${listName}`) !== undefined) {
                            for (var i = 0; i < eval(`page.json.custom.${LANG}.list.${listName}.length`); i++) {
                                listEle.innerHTML += `
                <li class="mdui-list-item mdui-ripple" id="${i}">
                    ${displayListImage(i, listName, "custom")}
                    <div class="mdui-list-item-content" onclick="${displayListAddFunction(i, listName, "custom")}; page.change()">
                        <div class="mdui-list-item-title" id="listName">${displayListName(i, listName, "custom")}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line" id="listInfo">${displayListInfo(i, listName, "custom")}</div>
                    </div>
                    ${displayListURL(i, listName, "custom")}
                </li>`
                            }
                        }
                    }
                }
                this.getListName("display")
                this.exhaustive.judge()
            }
        },
        search: function () {
            var theLatestParameter = inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]
            var e = 0
            for (var i = 0; i < listEle.querySelectorAll('.mdui-list-item').length; i++) {
                listEle.querySelectorAll('.mdui-list-item')[i].style.display = "none"
                if (listEle.querySelectorAll('#listName')[i].innerHTML.startsWith(theLatestParameter) == true || eval("/" + theLatestParameter + "/g.test(listEle.querySelectorAll('#listName')[i].innerHTML)") == true) {
                    listEle.querySelectorAll('.mdui-list-item')[i].style.display = ""
                    e++
                }
                if (e == 0) {
                    if (listEle.querySelectorAll('#listInfo')[i].innerHTML.startsWith(theLatestParameter) == true || eval("/" + theLatestParameter + "/g.test(listEle.querySelectorAll('#listInfo')[i].innerHTML)") == true) {
                        listEle.querySelectorAll('.mdui-list-item')[i].style.display = ""
                    }
                }
            }
        },
        exhaustive: {
            judge: function () {
                var commandLength = inputEle.value.split(" ").length
                if (grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1] !== undefined) {
                    listEle.setAttribute("data-is-exhaustive", "false")
                    document.querySelector("#Exhaustive-card").style.display = "none"
                    if (grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1].getAttribute("data-grammar-cammand-exhaustive") === "true") {
                        document.querySelector("#Exhaustive-card").style.display = ""
                        listEle.setAttribute("data-is-exhaustive", "true")
                        mdui.snackbar({
                            message: "此列表可以穷举（点击浮动按钮了解更多）",
                            position: "left-top",
                            timeout: 2000,
                            closeOnOutsideClick: false
                        })
                        for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                            listEle.querySelectorAll(".mdui-list-item")[i].innerHTML = `
                    <label class="mdui-checkbox">
                        <input type="checkbox"/>
                        <i class="mdui-checkbox-icon" style="margin-left: 9px;"></i>
                    </label>` + listEle.querySelectorAll(".mdui-list-item")[i].innerHTML
                            listEle.querySelectorAll("label")[i].addEventListener("click", () => {
                                for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                                    if (listEle.querySelectorAll(".mdui-list-item")[i].querySelector("input").checked == true) {
                                        listEle.querySelectorAll(".mdui-list-item")[i].classList.add("mdui-list-item-active")
                                    } else {
                                        listEle.querySelectorAll(".mdui-list-item")[i].classList.remove("mdui-list-item-active")
                                    }
                                }
                            })
                        }
                    }
                }
            },
            button: {
                select: {
                    all: function () {
                        if (listEle.getAttribute("data-is-exhaustive") === "true") {
                            for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                                listEle.querySelectorAll("input")[i].checked = true
                                listEle.querySelectorAll(".mdui-list-item")[i].classList.add("mdui-list-item-active")
                            }
                        }
                    },
                    none: function () {
                        if (listEle.getAttribute("data-is-exhaustive") === "true") {
                            for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                                listEle.querySelectorAll("input")[i].checked = false
                                listEle.querySelectorAll(".mdui-list-item")[i].classList.remove("mdui-list-item-active")
                            }
                        }
                    },
                    back: function () {
                        if (listEle.getAttribute("data-is-exhaustive") === "true") {
                            for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                                if (listEle.querySelectorAll("input")[i].checked == true) {
                                    listEle.querySelectorAll("input")[i].checked = false
                                    listEle.querySelectorAll(".mdui-list-item")[i].classList.remove("mdui-list-item-active")
                                } else {
                                    listEle.querySelectorAll("input")[i].checked = true
                                    listEle.querySelectorAll(".mdui-list-item")[i].classList.add("mdui-list-item-active")
                                }
                            }
                        }
                    }
                },
                add: function () {
                    if (listEle.getAttribute("data-is-exhaustive") == "true") {
                        page.inputEle.add(page.listEle.exhaustive.output())
                    }
                }
            },
            preview: function () {
                if (listEle.getAttribute("data-is-exhaustive") == "true") {
                    document.querySelector(`${document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href}`).querySelector("#getExhaustivePreview").value = outputExhaustive()
                }
            },
            output: function () {}
        }
    },
    grammarEle: {
        load: function () {
            grammarEle.innerHTML = ""
            noteEle.innerHTML = ""
            if (eval(`page.json.main.${LANG}.list.command.filter(function(item){return item.name === "/${page.inputEle.getCommandName()}"})`)[0] !== undefined) {
                grammarEle.innerHTML = `<span id="0" data-grammar-command-length="0" data-grammar-cammand-list="command">${eval(`page.json.main.${LANG}.list.command.filter(function(item){return item.name === "/${page.inputEle.getCommandName()}"})`)[0].name} </span>`
                noteEle.innerHTML = `<span id="0" style="display: none;">${eval(`page.json.main.${LANG}.list.command.filter(function(item){return item.name === "/${page.inputEle.getCommandName()}"})`)[0].info}</span>`
                this.loadFromJson(`page.json.main.${LANG}.grammar.${page.inputEle.getCommandName()}[0]`)
                this.display("grammarEle")
                this.strong()
            } else {
                grammarEle.innerHTML = `<span>/${page.inputEle.getCommandName()} </span>`
                noteEle.innerHTML = `未知的命令（此命令不存在于 page.json.main.${LANG}.list.command 中）`
            }
        },
        loadFromJson: function (str, i = 1) {
            var thisGrammarEle = grammarEle.querySelectorAll("span.part")[document.querySelectorAll("span.part").length - 1] || grammarEle
            if (eval(str.split("[", str.split("[").length - 1).join("[")) !== undefined) {
                if (eval(str.split("[", str.split("[").length - 1).join("[")).length > 1) {
                    for (var e = 0; e < eval(str.split("[", str.split("[").length - 1).join("[")).length; e++) {
                        str = str.split("[", str.split("[").length - 1).join("[") + `[${e}]`
                        if (eval(`${str}.exhaustive`) === "true") {
                            thisGrammarEle.innerHTML += `<span id="${i}" data-grammar-command-length="${eval(`${str}.length`)}" data-grammar-cammand-list="${eval(`${str}.list`)}" data-grammar-cammand-exhaustive="true" data-grammar-judge="${eval(`${str}.judge`)}" class="part mdui-hidden" style="font-weight: normal !important;">${eval(`${str}.text`)} </span>`
                        } else {
                            thisGrammarEle.innerHTML += `<span id="${i}" data-grammar-command-length="${eval(`${str}.length`)}" data-grammar-cammand-list="${eval(`${str}.list`)}" data-grammar-judge="${eval(`${str}.judge`)}" class="part mdui-hidden" style="font-weight: normal !important;">${eval(`${str}.text`)} </span>`
                        }
                        noteEle.innerHTML += `<span id="${i}" style="display: none;">${eval(`${str}.note`)}</span>`
                        i++
                        this.loadFromJson(`${str}.next[0]`, i)
                    }
                } else if (eval(str) !== "End") {
                    if (eval(`${str}.exhaustive`) === "true") {
                            thisGrammarEle.innerHTML += `<span id="${i}" data-grammar-command-length="${eval(`${str}.length`)}" data-grammar-cammand-list="${eval(`${str}.list`)}" data-grammar-cammand-exhaustive="true" class="mdui-hidden" style="font-weight: normal !important;">${eval(`${str}.text`)} </span>`
                        } else {
                            thisGrammarEle.innerHTML += `<span id="${i}" data-grammar-command-length="${eval(`${str}.length`)}" data-grammar-cammand-list="${eval(`${str}.list`)}" class="mdui-hidden" style="font-weight: normal !important;">${eval(`${str}.text`)} </span>`
                        }
                    noteEle.innerHTML += `<span id="${i}" style="display: none;">${eval(`${str}.note`)}</span>`
                    i++
                    this.loadFromJson(`${str}.next[0]`, i)
                }
            } else {
                grammarEle.innerHTML = `<span>${page.inputEle.getCommandName()}</span>`
                noteEle.innerHTML = `未知的命令（此命令不存在于 page.json.main.${LANG}.grammar 中）`
            }
        },
        display: function (element) {
            if (eval(`${element}.querySelectorAll("span").length`) !== 0) {
                for (var i = 0; i < eval(`${element}.querySelectorAll("span").length`); i++) {
                    if (eval(`${element}.querySelectorAll("span")[${i}].classList.contains("part")`) === true) break
                    eval(`${element}.querySelectorAll("span")[${i}].classList.remove("mdui-hidden")`)
                }
            }
            if (eval(`${element}.querySelectorAll("span.part").length`) !== 0) {
                var e = 0
                for (var i = 0; i < eval(`${element}.querySelectorAll("span.part").length`); i++) {
                    for (var x = 0; x < eval(`${element}.querySelectorAll("span.part").length`); x++) {
                        eval(`${element}.querySelectorAll("span.part")[${x}].classList.add("mdui-hidden")`)
                    }
                    if (eval(`${eval(`${element}.querySelectorAll("span.part")[${i}].getAttribute("data-grammar-judge")`)}.test("${page.inputEle.getParameterByLength(eval(`${element}.querySelectorAll("span.part")[${i}].getAttribute("data-grammar-command-length")`))}")`) === true && e < 1) {
                        eval(`${element}.querySelectorAll("span.part")[${i}].classList.remove("mdui-hidden")`)
                        e++
                        break
                    }
                }
                if (e === 0) {
                    eval(`${element}.querySelectorAll("span.part")[0].classList.remove("mdui-hidden")`)
                }
                this.display(`${element}.querySelector("span.part:not(.mdui-hidden)")`)
            }
        },
        strong: function () {
            var commandLength = inputEle.value.split(" ").length
            if (grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1] !== undefined) {
                grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1].style.fontWeight = "bold"
                for (var i = 0; i < noteEle.querySelectorAll("span").length; i++) {
                    noteEle.querySelectorAll("span")[i].style.display = "none"
                }
                noteEle.querySelector(`[id="${grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1].id}"]`).style.display = ""
            } else {
                listEle.setAttribute("data-edit-finished", "true")
            }
        }
    },
    custom: {
        setURL: function (isWithoutReload) {
            var allURL = document.querySelector("#customURL").value.split("\n")
            if (allURL.length >= 1) {
                var comment = document.createComment("Custom JavaScript")
                document.body.appendChild(comment)
                var realURL = new Array
                for (var i = 0; i < allURL.length; i++) {
                    if (allURL[i] !== "" && allURL[i].endsWith(".js")) {
                        var script = document.createElement("script")
                        script.src = allURL[i]
                        document.body.appendChild(script)
                        realURL.push(allURL[i])
                    } else if (allURL[i] !== "" && allURL[i].endsWith("/custom.json")) {
                        var request = new XMLHttpRequest()
                        request.open("get", allURL[i])
                        request.send(null)
                        request.onload = function () {
                            if (request.status == 200) {
                                page.json.custom = JSON.parse(request.responseText)
                            }
                        }
                        realURL.push(allURL[i])
                    }
                }
            }
            localStorage.setItem("customURL", `${realURL}`)
            document.querySelector("#customURL").value = localStorage.getItem("customURL").split(",").join("\n")
            if (isWithoutReload === true) return
            location.reload()
        },
        setURLFromStorage: function () {
            document.querySelector("#customURL").value = localStorage.getItem("customURL").split(",").join("\n")
            this.setURL(true)
        },
        getURL: function () {
            return localStorage.getItem("extendURL").split(",")
        }
    },
    setting: {
        developer: {
            eruda: {
                set: function (value) {
                    if (value === "true" || value === "false") {
                        localStorage.setItem("eruda", value)
                    }
                },
                get: function () {
                    return localStorage.getItem("eruda")
                }
            }
        },
        language: {
            available: {
                zh: "中文（简体）"
            },
            set: function (lang) {
                if (this.available.filter(function(item){return item === lang})) {
                    localStorage.setItem("language", lang)
                }
                LANG = localStorage.getItem("language")
            },
            setFromStorage: function () {
                LANG = localStorage.getItem("language")
            },
            get: function () {
                return localStorage.getItem("language")
            }
        },
        mduiThemeColor: {
            origin: {
                primary: "indigo",
                accent: "pink"
            },
            set: function (primary, accent) {
                document.body.classList.remove(`mdui-theme-primary-${this.origin.primary}`)
                document.body.classList.remove(`mdui-theme-accent-${this.origin.accent}`)
                this.origin = {
                    primary: primary,
                    accent: accent
                }
                localStorage.setItem("mduiThemeColor", `{primary: "${primary}", accent: "${accent}"}`)
                document.body.classList.add(`mdui-theme-primary-${primary}`)
                document.body.classList.add(`mdui-theme-accent-${accent}`)
            },
            setFromStorage: function () {
                var storage = eval(`(${localStorage.getItem("mduiThemeColor")})`)
                this.set(storage.primary, storage.accent)
            },
            get: function () {
                return {
                    primary: this.origin.primary,
                    accent: this.origin.accent
                }
            }
        }
    }
}




function exhaustive(request) {
    
    
    
    var activeTab = document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href
    
    
    
    function getExhaustivePreinstall() {
        theLatestParameter = inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]
    }
    
    
    
    
    function exhaustiveOutput() {
        var output = ""
        if (document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href === "#Exhaustive-tab1-byList") {

        } else if (document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href === "#Exhaustive-tab2-byInput") {
            for (var i = 0; i < document.querySelector(`${activeTab}`).querySelector("#setExhaustiveInput").value.split("\n").length; i++) {
                var exhaustiveItem = document.querySelector(`${activeTab}`).querySelector("#setExhaustiveInput").value.split("\n")[i]
                output += `${getExhaustivePreinstall()}${exhaustiveItem},`
            }
        }
        return output
    }
}