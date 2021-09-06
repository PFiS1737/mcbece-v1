const inputEle = document.querySelector('#edit')
const grammarEle = document.querySelector("#grammar")
const noteEle = document.querySelector("#note")
const listEle = document.querySelector("#list")

let customJson

String.prototype.isCoordinate = function (model) {
    let matchRegex = /^[-~^.0-9]+/
    let testRegex = /^(~|\^)?(-?[.0-9])*$/
    if (model === `test`) {
        return testRegex.test(this)
    } else {
        return matchRegex.test(this)
    }
}

String.prototype.isSelector = function (model) {
    let matchRegex = /(^@[a-z]?(\[[-~^=,\.\w]*\]?)?|[\w]+)/
    let testRegex = /^(@[a-z])?(\[[-~^=,\.\w]*\])?$/
    if (model === `test`) {
        return testRegex.test(this)
    } else {
        return matchRegex.test(this)
    }
}

Object.prototype.forEach = function (callback) {
    Object.keys(JSON.parse(JSON.stringify(this))).forEach(key => {
        let value = this[key]
        callback(key, value)
    })
}

const page = {
    initialization: function () {
        inputEle.placeholder = page.json[LANG].text.inputText
        if (screen.height < 800) {
            document.body.classList.add("thin-model")
            page.thin_model = true
        }
        if (LANG === "en") {
            grammarEle.classList.add("minecraft-font")
        }
        page.custom.setURLFromStorage()
        inputEle.oninput = () => {
            page.change()
            page.list.search()
        }
        this.change()
    },
    change: function () {
        document.querySelector("#wiki").href = page.json[LANG].text.url.command_page + inputEle.value.split(" ")[0]
        page.editEnd = false
        page.input.copy("display")
        if (inputEle.value.split(" ").length === 1) {
            page.list.load("command")
            grammarEle.innerHTML = ""
            noteEle.innerHTML = page.json[LANG].text.beginText
            return
        }
        let result = this.grammar.load()
        if (result.finish === true) {
            listEle.innerHTML = ""
            grammarEle.innerHTML = ""
            noteEle.innerHTML = page.json[LANG].text.endText
            page.editEnd = true
            page.list.name = []
            page.input.copy("display")
        } else {
            this.list.load(result.list)
        }
    },
    input: {
        input: function (text, replace) {
            if (replace === "all") {
                inputEle.value = ""
            } else if (replace === "none") {
                inputEle.value = inputEle.value
            } else {
                if (replace === "the_latest_selector_variable") {
                //if (page.list._name === "selector.variable") {
                    let selector_variable = inputEle.value.split("[")[inputEle.value.split("[").length - 1]
                    if (/,/.test(selector_variable)) {
                        inputEle.value = inputEle.value.split(",", inputEle.value.split(",").length - 1).join(",") + ","
                    } else {
                        inputEle.value = inputEle.value.split("[", inputEle.value.split("[").length - 1).join("[") + "["
                    }
                } /*else if (/selector\.variable\[[0-9]+\]\.value/.test(page.list._name)) {
                    inputEle.value = inputEle.value.split("=", inputEle.value.split("=").length - 1).join("=") + "="
                } */else {
                    if (inputEle.value.split(" ").length === 1) {
                        inputEle.value = "/"
                    } else {
                        inputEle.value = inputEle.value.split(" ", inputEle.value.split(" ").length - 1).join(" ") + " "
                    }
                }
            }
            inputEle.value += text
        },
        copy: function (model) {
            if (model === "copy") {
                inputEle.select()
                inputEle.setSelectionRange(0, inputEle.value.length)
                document.execCommand('copy')
                mdui.snackbar({
                    message: "已复制",
                    position: "left-top",
                    timeout: 2000,
                    closeOnOutsideClick: false
                })
            } else if (model === "display") {
                if (page.editEnd === true) {
                    document.querySelector("#wiki").style.display = "none"
                    document.querySelector("#copy").style.display = ""
                } else {
                    document.querySelector("#wiki").style.display = ""
                    document.querySelector("#copy").style.display = "none"
                }
            }
        },
        getCommandName: function() {
            let commandName = inputEle.value.split(" ")[0]
            if (commandName === "") {
                return undefined
            } else {
                return commandName
            }
        },
        getByLength: function(length) {
            if (length === "the_latest_command_parameter") {
                return inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]
            } else if (length === "the_latest_selector_variable") {
                let all = this.getByLength("the_latest_command_parameter").split("[")[1].split(",")
                return all[all.length - 1]
            } else {
                return inputEle.value.split(" ")[length]
            }
        },
        getInputType: function () {
            // TODO: finish this function to get the type you are inputing
            //       判断正在输入的类型
            let type = [
                    "selector_variable_value_coordinate",
                    "selector_variable_value_coordinate_value",
                    "selector_variable_value_scores",
                    "selector_variable_value_scores_value",
                ]
            let input = listEle.value
            let latest = this.getByLength("the_latest_command_parameter")
            if (latest.startsWith("@")) {
                let selector = latest
                if (selector.length < 2) {
                    return "selector_parameter"
                } else if (selector.length === 2) {
                    return "selector_next"
                } else if (selector.length > 2 && selector.split("")[2] === "[") {
                    let variable_item = selector.split("[")[1].split("]")[0].split(",")[selector.split("[")[1].split("]")[0].split(",").length - 1]
                    let key = variable_item.split("=")[0]
                    let value = variable_item.split("=")[1]
                    if (key !== undefined && key !== "" && value !== undefined && value !== "" && !selector.endsWith("]")) {
                        return "selector_variable_next"
                    } else if (key !== undefined && key !== "" && value !== undefined && value !== "" && selector.endsWith("]")) {
                        return "next"
                    } else if (key !== undefined && key !== "" && value === "") {
                        if (key === "coordinate") {
                            // TODO
                        } else if (key === "scores") {
                            // TODO
                        }
                    } else if ((key === "" && value === undefined) || (key !== undefined && key !== "" && value === undefined)) {
                        return "selector_variable"
                    }
                }
            } else {
                if (latest.length >= 1) {
                    return "next"
                } else {
                    return "command_parameter"
                }
            }
        }
    },
    list: {
        name: [],
        //_name: "",
        load: function (listGroup) {
            let result = this._module.getFromJson(listGroup)
            //console.log({result})
            if (this.name.sort().toString() !== result.name.sort().toString()) {
                //this._name = listGroup
                this.name = result.name
                this._module.loadToPage(result.list, list => {
                    listEle.innerHTML = list
                })
                //console.log(this.name)
            }
        },
        _module: {
            reassign: function (listName, dataName = "main") {
                if (listName === "selector") {
                    let selector = page.input.getByLength("the_latest_command_parameter")
                    if (selector.length < 2) {
                        return "selector.parameter"
                    } else if (selector.length === 2 && selector.startsWith("@")) {
                        return "selector.next"
                    } else if (selector.length > 2 && selector.split("")[2] === "[") {
                        let variable_item = selector.split("[")[1].split("]")[0].split(",")[selector.split("[")[1].split("]")[0].split(",").length - 1]
                        let key = variable_item.split("=")[0]
                        let value = variable_item.split("=")[1]
                        let index = page.json[LANG].list.selector.variable.findIndex(item => {
                            return item.name === key
                        })
                        if (key !== undefined && key !== "" && value !== undefined && value !== "" && !selector.endsWith("]")) {
                            
                            // TODO
                            /*if (/^coordinate.(x|y|z)$/.test(page.list.name)) {
                                return `selector.next_variable; coordinate.${key}[0].value`
                            } else {
                                return `selector.next_variable; selector.variable[${index}].value`
                            }*/
                            
                            return "selector.next_variable"
                        } else if (key !== undefined && key !== "" && value !== undefined && value !== "" && selector.endsWith("]")) {
                            return "next"
                        } else if (key !== undefined && key !== "" && value === "") {
                            return `selector.variable[${index}].value`
                        } else if ((key === "" && value === undefined) || (key !== undefined && key !== "" && value === undefined)) {
                            return "selector.variable"
                        }
                    }
                } else if (/^coordinate.(x|y|z)$/.test(listName)) {
                    let coordinate = page.input.getByLength("the_latest_command_parameter")
                    if (coordinate.length < 1) {
                        return listName
                    } else if (coordinate === "~" || coordinate === "^") {
                        return `${listName}[0].value`
                    } else {
                        return "next"
                    }
                } else if (/^rotation.(x|y)$/.test(listName)) {
                    let rotation = page.input.getByLength("the_latest_command_parameter")
                    if (rotation.length < 1) {
                        return listName
                    } else if (rotation === "~") {
                        return `${listName}[0].value`
                    } else {
                        return "next"
                    }
                } else if (listName === "enchantment.level") {
                    let enchantment = page.input.getByLength(inputEle.value.split(" ").length - 2)
                    let index = page.json[LANG].list.enchantment.findIndex(item => {
                        return item.name === enchantment
                    })
                    if (index !== undefined) {
                        return `enchantment[${index}].level`
                    }
                } else {
                    return listName
                }
            },
            getFromJson: function (listGroup, dataName = "main") {
                if (listGroup === undefined) { return }
                listGroup = [...new Set(listGroup.replace(/(\s)?;(\s)?/g, ";").split(";"))]
                let allList = []
                let allName = []
                let extend = {
                    list: [],
                    name: []
                }
                for (let i = 0; i < listGroup.length; i++) {
                    let part = listGroup[i].match(/(^[.a-z\[\]0-9_]+)({.*}$)?/)
                    let listName = this.reassign(part[1])
                    
                    // TODO
                    /*if (/(\s)?;(\s)?/.test(listName)) {
                        let callback = this.getFromJson(listName).list
                        allList.push(callback.list)
                        allName.push(...callback.name)
                        continue
                    }*/
                    
                    let init = eval(`(${part[2]})`)
                    if (init === undefined) { init = {} }
                    let { length: { max: maxLength, min: minLength = 1 } = {}, input: { replace, text } = {} } = init
                    let item = eval(`page.json.${LANG}.list.${listName}`)
                    if (item === undefined) {
                        allList.push([
                            {
                                "info": `未知的列表`
                            }
                        ])
                        allName.push(listName)
                        continue
                    } else if (item.length === 0 || (item.length === 1 && "extend" in item[0] === false)) {
                        allList.push([
                            {
                                "info": `空列表`
                            }
                        ])
                        allName.push(listName)
                        continue
                    } else if ("extend" in item[0]) {
                        extend = this.getFromJson(item[0].extend, dataName)
                        allList.push(...extend.list)
                        allName.push(...extend.name)
                        if (item.length === 1) {
                            continue
                        }
                    }
                    item = JSON.parse(JSON.stringify(item))
                    if (maxLength === undefined || maxLength > item.length - 1) { maxLength = item.length - 1 }
                    if (minLength < 2) { minLength = 1 }
                    if (maxLength < 2) { maxLength = 1 }
                    if (minLength > maxLength) { minLength = maxLength - 1 }
                    let input = item[0].template.input
                    if (replace !== undefined) { input.replace = replace }
                    if (text !== undefined) { input.text = text }
                    let result = []
                    for (let i = minLength; i < maxLength + 1; i++) {
                        if (item[i].input === undefined) { item[i].input = input }
                        if (item[i].url === undefined) { item[i].url = item[0].template.url }
                        result.push(item[i])
                    }
                    allList.push(result)
                    allName.push(listName)
                }
                return {
                    list: allList,
                    
                    // TODO : name; realName
                    
                    name: allName
                }
            },
            loadToPage: function (list, callback, config = []) {
                //console.log({list})
                function _getImage(listItem) {
                    if (page.thin_model || this.withImage) { return "" }
                    let image = listItem.image
                    if (image === undefined || image === "") {
                        return ""
                    } else {
                        return `<div class="mdui-list-item-avatar" id="image"><img src="${image}"/></div>`
                    }
                }
                function _getOnclick(listItem) {
                    let input = listItem.input
                    let auto_next_list = listItem.auto_next_list
                    if (input !== undefined || auto_next_list !== undefined) {
                        let output = {
                            input: {
                                replace: "",
                                text: ""
                            },
                            auto_next_list: ""
                        }
                        if (input !== undefined) {
                            let replace = input.replace
                            let text = input.text
                            if (replace !== undefined) {
                                output.input.replace = `, '${replace}'`
                            }
                            if (text !== undefined) {
                                output.input.text = text.replace(/{name}/g, listItem.name).replace(/{info}/g, listItem.info.replace(/{color:\s?.+}/g, ""))
                            }
                            output.input = `page.input.input('${output.input.text}'${output.input.replace})`
                        } else {
                            output.input = ""
                        }
                        if (auto_next_list !== undefined) {
                            output.auto_next_list = `; page.list.load('${auto_next_list}')`
                        } else {
                            output.auto_next_list = "; page.change()"
                        }
                        return ` onclick="${output.input}${output.auto_next_list}"`
                    } else {
                        return ""
                    }
                }
                function _getName(listItem) {
                    let name = listItem.name
                    return name
                }
                function _getInfo(listItem) {
                    let info = listItem.info
                    let regex = /{color:\s?(#[0-9A-Z]{6}|rgb\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|rgba\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+,\s?[.0-9]\)|black|white)}/g
                    return info.replace(regex, '<span style="background-color: $1; margin: 0 4px; border: 1px inset black">&emsp;</span>')
                }
                function _getURL(listItem) {
                    if (page.thin_model) { return "" }
                    let url = listItem.url
                    if (url === undefined || url === "") {
                        return ""
                    } else {
                        let output = url.replace(/{name}/g, listItem.name).replace(/{info}/g, listItem.info.replace(/{color:\s?.+}/g, "").replace(/\[.*\]/g, "")).replace(/{command_page}/g, eval(`page.json.${LANG}.text.url.command_page`)).replace(/{normal_page}/g, eval(`page.json.${LANG}.text.url.normal_page`)).replace(/{search_page}/g, eval(`page.json.${LANG}.text.url.search_page`))
                        return `<a class="mdui-btn mdui-btn-icon mdui-list-item-display-when-hover" href="${output}" target="_blank" id="url"><i class="mdui-icon material-icons mdui-text-color-black-icon">send</i></a>`
                    }
                }
                let name = page.list.name
                let output = ""
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    let newListEle = ""
                    if (!page.thin_model) {
                        newListEle = `<li class="mdui-ripple" id="listName"><div class="mdui-list-item-text">---------- ${name[i]} ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div></li>`
                    }
                    /** 
                     * 本来设计的当列表长度超过某个值时，分步加载减少卡顿
                     * 做完才发现...
                     * 而且之前加载个 entity 列表就卡个半死，现在加载 block 基本不影响使用
                     * FIXME: 不过依然有肉眼可见的卡顿，特别是输入时运行 search() 函数时，回头要优化一下
                     * 
                     * 所以这里给大家提个醒，当发现某个地方需要优化时，如果不是马上就改
                     * 等到时候要改前一定要先试一试，看看是否已经被不经意间优化完了 ...
                     */
                    let step = 200000  // 步长，因为这段没用了，所以步长调的很高，使这段不加载（应该不会有列表炒股这个长度吧~）
                    if (item.length > step && config.length === 0) {
                        for (let e = 0; e < item.length; e = e + step) {
                            let minLength = e
                            let maxLength = e + step - 1
                            if (maxLength > item.length) { maxLength = item.length - 1 }
                            this.loadToPage([item], list => {
                                newListEle += list
                            }, [minLength, maxLength])
                        }
                        output += `<div id="${name[i]}">${newListEle}</div>`
                        continue
                    }
                    let [ minLength = 0, maxLength = item.length - 1] = config
                    for (let id = minLength; id < maxLength + 1; id++) {
                        let listItem = item[id]
                        if (listItem.name === undefined) { listItem.name = "" }
                        if (listItem.info === undefined) { listItem.info = "" }
                        newListEle += `
                        <li class="mdui-list-item mdui-ripple" id="${id}">
                            ${_getImage(listItem)}
                            <div class="mdui-list-item-content"${_getOnclick(listItem)}>
                                <div class="mdui-list-item-title minecraft-font" id="name">${_getName(listItem)}</div>
                                <div class="mdui-list-item-text mdui-list-item-one-line" id="info">${_getInfo(listItem)}</div>
                            </div>
                            ${_getURL(listItem)}
                        </li>`
                    }
                    output += `<div id="${name[i]}">${newListEle}</div>`
                }
                callback(output)
            }
        },
        search: function () {
            listEle.querySelectorAll("div:not([class])").forEach(list => {
                list.style.display = ""
                let text = page.input.getByLength("the_latest_command_parameter")
                if (/next/g.test(list.id) || /selector\.variable\[[0-9]+\]\.value/.test(list.id)) {
                    return
                } else if (list.id === "command") {
                    text = text.replace("/", "")
                } else if (list.id === "selector.variable") {
                    text = page.input.getByLength("the_latest_selector_variable")
                }
                if (text === "") {
                    list.querySelectorAll('.mdui-list-item').forEach(item => {
                        item.style.display = ""
                    })
                    return
                }
                let e = 0
                for (let i = 0; i < list.querySelectorAll('.mdui-list-item').length; i++) {
                    list.querySelectorAll('.mdui-list-item')[i].style.display = "none"
                    if (eval(`/${text}/g.test(list.querySelectorAll('#name')[i].innerHTML)`)) {
                        list.querySelectorAll('.mdui-list-item')[i].style.display = ""
                        e++
                    }
                }// FIXME: 搜索时遇到 “?”会因转义问题而出现误判
                if (e === 0) {
                    for (let i = 0; i < list.querySelectorAll('.mdui-list-item').length; i++) {
                        list.querySelectorAll('.mdui-list-item')[i].style.display = "none"
                        if (eval(`/${text}/g.test(list.querySelectorAll('#info')[i].innerHTML)`)) {
                            list.querySelectorAll('.mdui-list-item')[i].style.display = ""
                            e++
                        }
                    }
                }
                if (e === 0) {
                    list.style.display = "none"
                }
            })
        }
    },
    grammar: {
        load: function(commandName = page.input.getCommandName()) {
            grammarEle.innerHTML = ""
            noteEle.innerHTML = ""
            let grammarGroup = page.json[LANG].grammar.find(item => {
                return eval(`${item[0].command.name}.test(commandName)`)
            })
            grammarEle.innerHTML = `<span>${commandName} </span>`
            if (grammarGroup !== undefined) {
                noteEle.innerHTML = `<span>${grammarGroup[0].command.info}</span>`
                let result = this._module.getFromJson(grammarGroup)
                if (result.info.length < inputEle.value.split(" ").length - 1) {
                    return {
                        finish: true
                    }
    
                    // FIXME: 英文下会将英文的语法项加载为html标签
                    // 可暂时使用零宽字符（这里建议使用"\u200E" 或其实体 "&lrm;"）将 "<" 与其后的文本隔开，不能用 "&lt;" 代替 "<"
                    // 可以参考 “fog” 命令的语法部分
    
                } else {
                    grammarEle.innerHTML += `<span>${result.grammar.replace(/x y z/g, "x&ensp;<span>y&ensp;</span><span>z</span>").replace(/(>|]|[a-z])\s(<|\[|[a-z])/g, "$1 </span><span>$2")}</span>`
                    grammarEle.querySelectorAll("span")[inputEle.value.split(" ").length - 1].style.fontWeight = "bold"
                    noteEle.innerHTML = result.info[inputEle.value.split(" ").length - 2].note
                    return {
                        list: result.info[inputEle.value.split(" ").length - 2].list
                    }
                }
            } else {
                noteEle.innerHTML = "未知的命令"
                console.warn(`您需要在 page.json.${LANG}.grammar 中添加该命令的语法`)
            }
        },
        _module: {
            getFromJson: function(grammarGroup) {
                let commandLength = inputEle.value.split(" ").length - 1
                if (grammarGroup.length > 2) {
                    let output = new Array
                    for (let i = 1; i < grammarGroup.length; i++) {
                        let result = new Array
                        for (let e = 0; e < commandLength && e < grammarGroup[i].display.length; e++) {
                            let length = grammarGroup[i].display[e].length
                            let rule = grammarGroup[i].display[e].rule
                            if (rule.type === "regex") {
                                if (eval(`${rule.text}.test(page.input.getByLength(length))`)) {
                                    result.push(true)
                                } else {
                                    result.push(false)
                                }
                            } else if (rule.type === "regex-contrary") {
                                if (eval(`${rule.text}.test(page.input.getByLength(length))`)) {
                                    result.push(false)
                                } else {
                                    result.push(true)
                                }
                            } else if (rule.type === "isSelector") {
                                if (page.input.getByLength(length) !== undefined) {
                                    if (page.input.getByLength(length).isSelector()) {
                                        result.push(true)
                                    } else {
                                        result.push(false)
                                    }
                                }
                            } else if (rule.type === "isCoordinate") {
                                if (page.input.getByLength(length) !== undefined) {
                                    if (page.input.getByLength(length).isCoordinate()) {
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
                    //console.log({output})
                    if (output[0] !== undefined) {
                        return grammarGroup[output[0]]
                    } else {
                        return grammarGroup[1]
                    }
                } else {
                    return grammarGroup[1]
                }
            }
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
                let available = Object.keys(this.available).find(item => {
                    return item === lang
                })
                if (available !== undefined) {
                    localStorage.setItem("language", lang)
                }
                location.reload()
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
                let storage = eval(`(${localStorage.getItem("mduiThemeColor")})`)
                this.set(storage.primary, storage.accent)
            },
            get: function () {
                return {
                    primary: this.origin.primary,
                    accent: this.origin.accent
                }
            }
        },
        withImage: {
            set: function (boolean) {
                localStorage.setItem("withImage", boolean)
                location.reload()
            },
            get: function () {
                return localStorage.getItem("language")
            }
        }
    },
    custom: {
        setURL: function(isReload = true) {
            let url = document.querySelector("#customURL").value
            localStorage.setItem("customURL", url)
            if (isReload) { return location.reload() }
            if (url.endsWith(".js")) {
                let comment = document.createComment("Custom URL")
                document.body.appendChild(comment)
                let script = document.createElement("script")
                script.src = url
                script.id = "cutom-url"
                document.body.appendChild(script)
                script.onload = () => {
                    this.load()
                }
            } else if (url.endsWith(".json")) {
                fetch(url).then(response => {
                    return response.json()
                }).then(json => {
                    this.load(json)
                }).catch(err => {
                    console.error(err)
                }); 
            }
        },
        setURLFromStorage: function() {
            document.querySelector("#customURL").value = localStorage.getItem("customURL")
            this.setURL(false)
        },
        getURL: function() {
            return localStorage.getItem("extendURL")
        },
        load: function(json) {
            if (customJson !== undefined) {
                json = JSON.parse(JSON.stringify(customJson))
            }
            json.forEach((lang, init) => {
                if (init.list !== undefined && init.list.constructor === Object) {
                    let list = init.list
                    list.forEach((listName, value) => {
                        if (page.json[lang].list[listName] === undefined || page.json[lang].list[listName].length === 0) {
                            page.json[lang].list[listName] = [...value]
                        } else {
                            page.json[lang].list[listName].push(...value)
                        }
                    })
                }
                if (init.grammar !== undefined && init.grammar.constructor === Array) {
                    page.json[lang].grammar.push(...init.grammar)
                }
            })
        }
    }
}











/**
 * ===========================
 * 穷举助手，先不写，以后再说
 * ===========================
 */

        /*,
        exhaustive: {
            judge: function () {
                let commandLength = inputEle.value.split(" ").length
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
                        for (let i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                            listEle.querySelectorAll(".mdui-list-item")[i].innerHTML = `
                    <label class="mdui-checkbox">
                        <input type="checkbox"/>
                        <i class="mdui-checkbox-icon" style="margin-left: 9px;"></i>
                    </label>` + listEle.querySelectorAll(".mdui-list-item")[i].innerHTML
                            listEle.querySelectorAll("label")[i].addEventListener("click", () => {
                                for (let i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
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
                            for (let i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                                listEle.querySelectorAll("input")[i].checked = true
                                listEle.querySelectorAll(".mdui-list-item")[i].classList.add("mdui-list-item-active")
                            }
                        }
                    },
                    none: function () {
                        if (listEle.getAttribute("data-is-exhaustive") === "true") {
                            for (let i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                                listEle.querySelectorAll("input")[i].checked = false
                                listEle.querySelectorAll(".mdui-list-item")[i].classList.remove("mdui-list-item-active")
                            }
                        }
                    },
                    contrary: function () {
                        if (listEle.getAttribute("data-is-exhaustive") === "true") {
                            for (let i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
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
                        page.input.add(page.list.exhaustive.output())
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
        
        
        
        


function exhaustive(request) {
    
    
    
    let activeTab = document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href
    
    
    
    function getExhaustivePreinstall() {
        theLatestParameter = inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]
    }
    
    
    
    
    function exhaustiveOutput() {
        let output = ""
        if (document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href === "#Exhaustive-tab1-byList") {

        } else if (document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href === "#Exhaustive-tab2-byInput") {
            for (let i = 0; i < document.querySelector(`${activeTab}`).querySelector("#setExhaustiveInput").value.split("\n").length; i++) {
                let exhaustiveItem = document.querySelector(`${activeTab}`).querySelector("#setExhaustiveInput").value.split("\n")[i]
                output += `${getExhaustivePreinstall()}${exhaustiveItem},`
            }
        }
        return output
    }
}*/