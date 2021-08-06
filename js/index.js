const inputEle = document.querySelector('#edit')
const grammarEle = document.querySelector("#grammar")
const noteEle = document.querySelector("#note")
const listEle = document.querySelector("#list")

let LANG

String.prototype.isCoordinate = function (model) {
    var matchRegex = /[-~^.0-9]+/
    var testRegex = /^(~|\^)?(-?[.0-9])*$/
    if (model === `test`) {
        return testRegex.test(this)
    } else {
        return matchRegex.test(this)
    }
}

String.prototype.isSelector = function (model) {
    var matchRegex = /^@[a-z]?(\[[-~^=,\.\w]*\]?)?/
    var testRegex = /^(@[a-z])?(\[[-~^=,\.\w]*\])?$/
    if (model === `test`) {
        return testRegex.test(this)
    } else {
        return matchRegex.test(this)
    }
}

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
        if (inputEle.value.split(" ").length === 1) return
        this.grammarEle.load()
        if (grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1] !== undefined) {
            this.listEle.load(`${grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1].getAttribute("data-grammar-command-list")}`)
        }
        this.edit.finish()
    },
    inputEle: {
        input: function (text, replace) {
            if (replace === "all") {
                inputEle.value = ""
            } else if (replace === "none") {
                inputEle.value = inputEle.value
            } else if (replace === "the_latest_selector_variable") {
                var selector_variable = inputEle.value.split("[")[inputEle.value.split("[").length - 1]
                if (/,/.test(selector_variable) === true) {
                    inputEle.value = inputEle.value.split(",", inputEle.value.split(",").length - 1).join(",") + ","
                } else {
                    inputEle.value = inputEle.value.split("[", inputEle.value.split("[").length - 1).join("[") + "["
                }
            } else {
                if (inputEle.value.split(" ").length === 1) {
                    inputEle.value = "/"
                } else {
                    inputEle.value = inputEle.value.split(" ", inputEle.value.split(" ").length - 1).join(" ") + " "
                }
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
                if (listEle.getAttribute("data-edit-finished") === "true") {
                    document.querySelector("#wiki").style.display = "none"
                    document.querySelector("#copy").style.display = ""
                } else {
                    document.querySelector("#wiki").style.display = ""
                    document.querySelector("#copy").style.display = "none"
                }
            }
        },
        getCommandName: function () {
            var commandName = inputEle.value.split(" ")[0]
            if (commandName === "") {
                return undefined
            } else {
                return commandName
            }
        },
        getParameterByLength: function (length) {
            if (length === "the_latest_command_parameter") {
                return inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]
            } else if (length === "the_latest_selector_variable") {
            	var all = this.getParameterByLength("the_latest_command_parameter").split("[")[1].split(",")
            	return all[all.length - 1]
            } else {
                return inputEle.value.split(" ")[length]
            }
        }
    },
    edit: {
        begin: function () {
            var commandLength = inputEle.value.split(" ").length
            document.querySelector("#wiki").href = page.json.main[LANG].text.url.command_page + inputEle.value.split(" ")[0]
            listEle.setAttribute("data-edit-finished", "false")
            page.inputEle.copy("display")
            if (commandLength === 1) {
                page.listEle.load("command")
            }
            if (inputEle.value === "") {
                inputEle.placeholder = page.json.main[LANG].text.inputText
                grammarEle.innerHTML = ""
                noteEle.innerHTML = page.json.main[LANG].text.beginText
            }
        },
        finish: function () {
            if (listEle.getAttribute("data-edit-finished") === "true") {
                listEle.innerHTML = ""
                grammarEle.innerHTML = ""
                noteEle.innerHTML = page.json.main[LANG].text.endText
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
            } else if (model == null) {
                return listName
            }
        },
        load: function (listName) {
            //console.log({listName})
            if (listEle.getAttribute("data-list-name") !== listName) {
                listEle.innerHTML = ""
                for (var i = 0; i < listName.split(",").length; i++) {
                    this.loadFromJson(listName.split(",")[i].replace(/\s/g, ""))
                    if (i === listName.split(",").length - 1) continue
                    listEle.innerHTML += '<div class="mdui-divider"></div>'
                }
                this.getListName("display")
                this.exhaustive.judge()
            }
        },
        loadFromJson: function (listName, isReassign = true) {
            listEle.setAttribute("data-list-name", listName)
            if (isReassign === true) {
            if (listName === "selector") {
                var selector = page.inputEle.getParameterByLength("the_latest_command_parameter")
                if (selector.split("").length <= 1) {
                    this.loadFromJson("selector.parameter")
                } else if (selector.split("").length === 2 && selector.startsWith("@") === true) {
                    listEle.innerHTML = ""
                    this.loadFromJson("selector.next")
                } else if (selector.split("").length > 2) {
                    var variable_item = selector.split("[")[1].split("]")[0].split(",")[selector.split("[")[1].split("]")[0].split(",").length - 1]
                    var key = variable_item.split("=")[0]
                    var value = variable_item.split("=")[1]
                    if (key !== undefined && key !== "" && value !== undefined && value !== "") {
                        listEle.innerHTML = ""
                        this.loadFromJson("selector.next_variable")
                    } else if (key !== undefined && key !== "" && value === "") {
                        var arr = new Array
                        var dataName = "main" || "custom"
                        if (page.json[dataName][LANG].list.selector.variable.find(function(item){return item.name===key}) !== undefined) {
                            listEle.innerHTML = ""
                            this.loadFromJson(`selector.variable[${page.json[dataName][LANG].list.selector.variable.findIndex((item)=>{return item.name===key})}].value`)
                        }
                    } else if ((key === "" && value === undefined) || (key !== undefined && key !== "" && value === undefined)) {
                        listEle.innerHTML = ""
                        this.loadFromJson("selector.variable")
                    }
                }
                return
            } else if (listName === "coordinate") {
                
                var coordinate = page.inputEle.getParameterByLength("the_latest_command_parameter")
                var coordinate_axis = page.grammarEle.now("element").getAttribute("data-grammar-coordinate-axis")
                if (coordinate.split("").length < 1) {
                    this.loadFromJson(`coordinate.${coordinate_axis}`, false)
                } else if (coordinate.split("").length === 1 || (coordinate.split("")[0] === "~" || coordinate.split("")[0] === "^")) {
                    listEle.innerHTML = ""
                    this.loadFromJson(`coordinate.${coordinate_axis}[0].value`, false)
                } else if (coordinate.split("").length >= 1) {
                    listEle.innerHTML = ""
                    this.loadFromJson("next")
                }
                return
            } else if (listName === "rotation") {
                var rotation = page.inputEle.getParameterByLength("the_latest_command_parameter")
                var rotation_axis = page.grammarEle.now("element").getAttribute("data-grammar-rotation-axis")
                if (rotation.split("").length < 1) {
                    this.loadFromJson(`commands.tp.rotation.${rotation_axis}`, false)
                } else if (rotation.split("").length === 1 || rotation.split("")[0] === "~") {
                    listEle.innerHTML = ""
                    this.loadFromJson(`commands.tp.rotation.${rotation_axis}[0].value`, false)
                } else if (rotation.split("").length >= 1) {
                    listEle.innerHTML = ""
                    this.loadFromJson("next")
                }
                return
            }
            }
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
                            output.input.text = text.replace(/{name}/g, eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].name`)).replace(/{info}/g, eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].info`))
                        }
                        output.input = `page.inputEle.input('${output.input.text}'${output.input.replace})`
                    } else {
                        output.input = ""
                    }
                    if (auto_next_list !== undefined) {
                        output.auto_next_list = `; page.listEle.load('${auto_next_list}')`
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
                    var output = url.replace(/{name}/g, eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].name`)).replace(/{info}/g, eval(`page.json.${dataName}.${LANG}.list.${listName}[${i}].info`)).replace(/{command_page}/g, eval(`page.json.main.${LANG}.text.url.command_page`)).replace(/{normal_page}/g, eval(`page.json.main.${LANG}.text.url.normal_page`)).replace(/{search_page}/g, eval(`page.json.main.${LANG}.text.url.search_page`))
                    return `<a class="mdui-btn mdui-btn-icon mdui-list-item-display-when-hover" href="${output}" target="_blank" id="listURL"><i class="mdui-icon material-icons mdui-text-color-black-icon">send</i></a>`
                }
            }
            //console.log(listName)
            if (eval(`page.json.main.${LANG}`) !== undefined) {
                if (eval(`page.json.main.${LANG}.list`) !== undefined) {
                    if (eval(`page.json.main.${LANG}.list.${listName}`) !== undefined) {
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
        },
        search: function () {
            var text = page.inputEle.getParameterByLength("the_latest_command_parameter")
            if (/next/g.test(page.listEle.getListName()) === true || page.listEle.getListName().startsWith("coordinate") === true || page.listEle.getListName().startsWith("selector.variable[") === true) {
            	return
            } else if (page.listEle.getListName() === "selector.variable") {
            	text = page.inputEle.getParameterByLength("the_latest_selector_variable")
            } else if (page.listEle.getListName() === "command") {
                text = text.replace("/", "")
            }
            var e = 0
            for (var i = 0; i < listEle.querySelectorAll('.mdui-list-item').length; i++) {
                listEle.querySelectorAll('.mdui-list-item')[i].style.display = "none"
                if (listEle.querySelectorAll('#listName')[i].innerHTML.startsWith(text) === true || eval(`/${text}/g.test(listEle.querySelectorAll('#listName')[i].innerHTML)`) === true) {
                    listEle.querySelectorAll('.mdui-list-item')[i].style.display = ""
                    e++
                }
                if (e === 0) {
                    if (listEle.querySelectorAll('#listInfo')[i].innerHTML.startsWith(text) === true || eval(`/${text}/g.test(listEle.querySelectorAll('#listInfo')[i].innerHTML)`) === true) {
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
                    if (grammarEle.querySelectorAll("span:not(.mdui-hidden)")[commandLength - 1].getAttribute("data-grammar-command-exhaustive") === "true") {
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
                                    if (listEle.querySelectorAll(".mdui-list-item")[i].querySelector("input").checked === true) {
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
                    contrary: function () {
                        if (listEle.getAttribute("data-is-exhaustive") === "true") {
                            for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                                if (listEle.querySelectorAll("input")[i].checked === true) {
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
                    if (listEle.getAttribute("data-is-exhaustive") === "true") {
                        page.inputEle.add(page.listEle.exhaustive.output())
                    }
                }
            },
            preview: function () {
                if (listEle.getAttribute("data-is-exhaustive") === "true") {
                    document.querySelector(`${document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href}`).querySelector("#getExhaustivePreview").value = outputExhaustive()
                }
            },
            output: function () {}
        }
    },
    grammarEle: {
        now: function (model) {
            var commandLength = inputEle.value.split(" ").length
            var item = grammarEle.querySelectorAll("span")[commandLength - 1]
            if (item === undefined) return undefined
            if (model === "element") {
                return item
            } else {
                var id = Number(item.id)
                var length = Number(item.getAttribute("data-grammar-command-length"))
                var list = item.getAttribute("data-grammar-command-list")
                return {
                    id: id,
                    length: length,
                    list: list
                }
            }
        },
        load: function (commandName = page.inputEle.getCommandName()) {
            grammarEle.innerHTML = ""
            noteEle.innerHTML = ""
            var grammarGroup = page.json.main[LANG].grammar.find(item => {
                return eval(`${item[0].command.name}.test(commandName)`) === true
            })
            //console.log({grammarGroup})
            if (grammarGroup !== undefined) {
                grammarEle.innerHTML = `<span id="0" data-grammar-command-length="0" data-grammar-command-list="command">${commandName} </span>`
                noteEle.innerHTML = `<span id="0" style="display: none;">${grammarGroup[0].command.info}</span>`
                var result = this.getFromJson(grammarGroup).grammar
                for (var i = 0; i < result.length; i++) {
                    var newEle = document.createElement("SPAN")
                    var id = i + 1
                    var length = result[i].length
                    var list = result[i].list
                    var text = result[i].text + " "
                    var note = result[i].note
                    if (list.replace(/\s/g, "").split(",").includes("coordinate") === true) {
                        text = text.replace("x y z", `x <span id="${id}" data-grammar-command-length="${length + 1}" data-grammar-command-list="coordinate" data-grammar-coordinate-axis="y">y </span><span id="${id}" data-grammar-command-length="${length + 2}" data-grammar-command-list="coordinate" data-grammar-coordinate-axis="z">z</span>`)
                        newEle.setAttribute("data-grammar-coordinate-axis", "x")
                    } else if (list.replace(/\s/g, "").split(",").includes("commands.tp.rotation.x") === true) {
                        list = "rotation"
                        newEle.setAttribute("data-grammar-rotation-axis", "x")
                    } else if (list.replace(/\s/g, "").split(",").includes("commands.tp.rotation.y") === true) {
                        list = "rotation"
                        newEle.setAttribute("data-grammar-rotation-axis", "y")
                    }
                    newEle.id = id
                    newEle.innerHTML = text
                    newEle.setAttribute("data-grammar-command-length", length)
                    newEle.setAttribute("data-grammar-command-list", list)
                    grammarEle.appendChild(newEle)
                    noteEle.innerHTML += `<span id="${id}">${note}</span>`
                }
                if (this.now("element") !== undefined) {
                    this.now("element").style.fontWeight = "bold"
                    for (var i = 0; i < noteEle.querySelectorAll("span").length; i++) {
                        noteEle.querySelectorAll("span")[i].style.display = "none"
                    }
                    noteEle.querySelector(`[id="${this.now("element").id}"]`).style.display = ""
                } else {
                    listEle.setAttribute("data-edit-finished", "true")
                }
            } else {
                grammarEle.innerHTML = `<span>${commandName} </span>`
                noteEle.innerHTML = "未知的命令"
                console.warn(`您需要在 page.json.main.${LANG}.grammar 中添加该命令的语法`)
            }
        },
        getFromJson: function (grammarGroup) {
                var output = new Array
                var commandLength = inputEle.value.split(" ").length - 1
                if (grammarGroup.length > 2) {
                    for (var i = 2; i < grammarGroup.length; i++) {
                        var result = new Array
                        for (var e = 0; e < commandLength && e < grammarGroup[i].display.length; e++) {
                            var length = grammarGroup[i].display[e].length
                            var rule = grammarGroup[i].display[e].rule
                            if (rule.type === "regex") {
                                if (eval(`${rule.text}.test(page.inputEle.getParameterByLength(length))`) === true) {
                                    result.push(true)
                                } else {
                                    result.push(false)
                                }
                            } else if (rule.type === "regex-contrary") {
                                if (eval(`${rule.text}.test(page.inputEle.getParameterByLength(length))`) === true) {
                                    result.push(false)
                                } else {
                                    result.push(true)
                                }
                            } else if (rule.type === "isSelector") {
                                if (page.inputEle.getParameterByLength(length) !== undefined) {
                                    if (page.inputEle.getParameterByLength(length).isSelector() === true) {
                                        result.push(true)
                                    } else {
                                        result.push(false)
                                    }
                                }
                            } else if (rule.type === "isCoordinate") {
                                if (page.inputEle.getParameterByLength(length) !== undefined) {
                                    if (page.inputEle.getParameterByLength(length).isCoordinate() === true) {
                                        result.push(true)
                                    } else {
                                        result.push(false)
                                    }
                                }
                            }
                        }
                        if (result.includes(false) === false) {
                            output.push(i)
                        }
                    }
                    if (output[0] !== undefined) {
                        console.log({output})
                        return grammarGroup[output[0]]
                    } else {
                        return grammarGroup[1]
                    }
                } else {
                    return grammarGroup[1]
                }
        }
    },
    custom: {
        setURL: function (isWithoutReload) {
            var URL = document.querySelector("#customURL").value
            if (URL.endsWith("/custom.json") === true) {
                var request = new XMLHttpRequest()
                request.open("get", URL)
                request.send(null)
                request.onload = function () {
                    if (request.status == 200) {
                        page.json.custom = JSON.parse(request.responseText)
                    }
                }
            } else {
                URL = ""
            }
            localStorage.setItem("customURL", URL)
            if (isWithoutReload === true) return
            location.reload()
        },
        setURLFromStorage: function () {
            document.querySelector("#customURL").value = localStorage.getItem("customURL")
            this.setURL(true)
        },
        getURL: function () {
            return localStorage.getItem("extendURL")
        }
    },
    setting: {
        developer: {
            devTool: {
                set: function (value) {
                    if (value === "true" || value === "false") {
                        localStorage.setItem("devTool", value)
                    }
                    location.reload()
                },
                get: function () {
                    return localStorage.getItem("devTool")
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

page.setting.language.setFromStorage()
page.setting.mduiThemeColor.setFromStorage()
page.custom.setURLFromStorage()
window.onload = () => {
    page.initialization()
}


/*

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
}*/