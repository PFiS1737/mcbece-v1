const inputEle = document.querySelector('#edit')
const grammarEle = document.querySelector("#grammar")
const noteEle = document.querySelector("#note")
const listEle = document.querySelector("#list")
const wikiEle = document.querySelector("#wiki")
const copyEle = document.querySelector("#copy")

let LANG = ""

const page = {
    json: {
        main: {
            zh: {}
        },
        custom: {}
    },
    text: {
        zh: {}
    },
    initialization: function () {
        inputEle.oninput = () => {
            page.change()
            page.listEle.search()
        }
        this.edit.begin()
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
        input: function (text, replace) {
            if (replace === "all") {
                inputEle.value = ""
            } else if (replace === "none") {
                inputEle.value = inputEle.value
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
            wikiEle.href = eval(`page.text.${LANG}.url.command_page`) + inputEle.value.split(" ")[0]
            listEle.setAttribute("data-edit-finished", "false")
            page.inputEle.copy("display")
            if (commandLength === 1) {
                page.listEle.load("command")
            }
            if (inputEle.value === "") {
                inputEle.placeholder = eval(`page.text.${LANG}.inputText`)
                grammarEle.innerHTML = ""
                noteEle.innerHTML = eval(`page.text.${LANG}.beginText`)
            }
        },
        finish: function () {
            if (listEle.getAttribute("data-edit-finished") === "true") {
                listEle.innerHTML = ""
                grammarEle.innerHTML = ""
                noteEle.innerHTML = eval(`page.text.${LANG}.endText`)
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
                    if (eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].image`) === undefined || eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].image`) === "") {
                        return ""
                    } else {
                        return `<div class="mdui-list-item-avatar"><img src="${eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].image`)}"/></div>`
                    }
                }
                function displayListOnclick(i, listName, dataName) {
                    var input = eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].input`) || eval(`page.json.${dataName}.${LANG}.list.${listName}[0].template.input`)
                    var auto_next_list = eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].auto_next_list`) || eval(`page.json.${dataName}.${LANG}.list.${listName}[0].template.auto_next_list`) 
                    if (input !== undefined || auto_next_list !== undefined) {
                        var output = {
                            input: {
                                replace: "",
                                text: ""
                            },
                            auto_next_list: ""
                        }
                        if (input !== undefined) {
                            var replace = input.replace
                            var text = input.text
                            if (replace !== undefined) {
                                output.input.replace = `, '${replace}'`
                            }
                            if (text !== undefined) {
                                output.input.text = text.replace(/{name}/g, eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].name`))
                                output.input.text = output.input.text.replace(/{info}/g, eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].info`))
                            }
                            output.input = `page.inputEle.input('${output.input.text}'${output.input.replace})`
                        } else {
                            output.input = ""
                        }
                        if (auto_next_list !== undefined) {
                            
                        } else {
                            output.auto_next_list = "; page.change()"
                        }
                        return ` onclick="${output.input}${output.auto_next_list}"`
                    } else {
                        return ""
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
                    var url = eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].url`) || eval(`page.json.${dataName}.${LANG}.list.${listName}[0].template.url`)
                    if (url === undefined || url === "") {
                        return ""
                    } else {
                        var output = url.replace(/{name}/g, eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].name`))
                        output = output.replace(/{info}/g, eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].info`))
                        output = output.replace(/{command_page}/g, eval(`page.text.${LANG}.url.command_page`))
                        output = output.replace(/{normal_page}/g, eval(`page.text.${LANG}.url.normal_page`))
                        output = output.replace(/{search_page}/g, eval(`page.text.${LANG}.url.search_page`))
                        return `<a class="mdui-btn mdui-btn-icon mdui-list-item-display-when-hover" href="${output}" target="_blank" id="listURL"><i class="mdui-icon material-icons mdui-text-color-black-icon">send</i></a>`
                    }
                }
                if (eval(`page.json.main.${LANG}`) !== undefined) {
                    if (eval(`page.json.main.${LANG}.list`) !== undefined) {
                        if (eval(`page.json.main.${LANG}.list.${listName}`) !== undefined) {
                            listEle.innerHTML = ""
                            listEle.setAttribute("data-list-name", `${listName}`)
                            for (var i = 1; i < eval(`page.json.main.${LANG}.list.${listName}.length`); i++) {
                                listEle.innerHTML += `
                <li class="mdui-list-item mdui-ripple" id="${i}">
                    ${displayListImage(i, listName, "main")}
                    <div class="mdui-list-item-content"${displayListOnclick(i, listName, "main")}>
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
                            for (var i = 1; i < eval(`page.json.custom.${LANG}.list.${listName}.length`); i++) {
                                listEle.innerHTML += `
                <li class="mdui-list-item mdui-ripple" id="${i}">
                    ${displayListImage(i, listName, "custom")}
                    <div class="mdui-list-item-content"${displayListOnclick(i, listName, "custom")}>
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
            if (/next/g.test(page.inputEle.getCommandName()) === true) return
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
        load: function (commandName = page.inputEle.getCommandName()) {
            grammarEle.innerHTML = ""
            noteEle.innerHTML = ""
            if (eval(`page.json.main.${LANG}.list.command.filter(function(item){return item.name === "/${commandName}"})`)[0] !== undefined) {
                grammarEle.innerHTML = `<span id="0" data-grammar-command-length="0" data-grammar-cammand-list="command">${eval(`page.json.main.${LANG}.list.command.filter(function(item){return item.name === "/${commandName}"})`)[0].name} </span>`
                noteEle.innerHTML = `<span id="0" style="display: none;">${eval(`page.json.main.${LANG}.list.command.filter(function(item){return item.name === "/${commandName}"})`)[0].info}</span>`
                this.loadFromJson(`page.json.main.${LANG}.grammar.${commandName}[0]`, commandName)
                this.display("grammarEle")
                this.strong()
            } else {
                grammarEle.innerHTML = `<span>/${commandName} </span>`
                noteEle.innerHTML = `未知的命令（此命令不存在于 page.json.main.${LANG}.list.command 中）`
            }
        },
        loadFromJson: function (str, commandName, id = 1) {
            var thisGrammarEle = grammarEle.querySelectorAll("span.part")[document.querySelectorAll("span.part").length - 1] || grammarEle
            if (eval(str.split("[", str.split("[").length - 1).join("[")) !== undefined) {
                if (eval(str.split("[", str.split("[").length - 1).join("[")).length > 1) {
                    for (var e = 0; e < eval(str.split("[", str.split("[").length - 1).join("[")).length; e++) {
                        str = str.split("[", str.split("[").length - 1).join("[") + `[${e}]`
                        var newEle = document.createElement("SPAN")
                        newEle.id = id
                        newEle.classList.add("part")
                        newEle.classList.add("mdui-hidden")
                        newEle.style = "font-weight: normal !important;"
                        newEle.innerHTML = eval(`${str}.text`)
                        newEle.setAttribute("data-grammar-command-length", eval(`${str}.length`))
                        newEle.setAttribute("data-grammar-cammand-list", eval(`${str}.list`))
                        newEle.setAttribute("data-grammar-judge", eval(`${str}.judge`))
                        if (eval(`${str}.exhaustive`) === "true") {
                            newEle.setAttribute("data-grammar-cammand-exhaustive", "true")
                        }
                        thisGrammarEle.appendChild(newEle)
                        noteEle.innerHTML += `<span id="${id}" style="display: none;">${eval(`${str}.note`)}</span>`
                        id++
                        this.loadFromJson(`${str}.next[0]`, commandName, id)
                    }
                } else if (eval(str) !== "End") {
                    var newEle = document.createElement("SPAN")
                    newEle.id = id
                    newEle.classList.add("mdui-hidden")
                    newEle.style = "font-weight: normal !important;"
                    newEle.innerHTML = eval(`${str}.text`)
                    newEle.setAttribute("data-grammar-command-length", eval(`${str}.length`))
                    newEle.setAttribute("data-grammar-cammand-list", eval(`${str}.list`))
                    if (eval(`${str}.exhaustive`) === "true") {
                        newEle.setAttribute("data-grammar-cammand-exhaustive", "true")
                    }
                    thisGrammarEle.appendChild(newEle)
                    noteEle.innerHTML += `<span id="${id}" style="display: none;">${eval(`${str}.note`)}</span>`
                    id++
                    this.loadFromJson(`${str}.next[0]`, commandName, id)
                }
            } else {
                grammarEle.innerHTML = `<span>/${commandName} </span>`
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