const inputEle = document.querySelector('#edit')
const grammarEle = document.querySelector("#grammar")
const noteEle = document.querySelector("#note")
const listEle = document.querySelector("#list")
const wikiEle = document.querySelector("#wiki")
const copyEle = document.querySelector("#copy")

// 常量
const LANG = localStorage.getItem("language")

// JSON
const json = {
    "main": {
        "zh": {}
    },
    "setting": {
        "zh": {}
    },
    "user": {}
}

// 变量
var theLatestParameter
var commandLength

// 获取当前指令的名称
function getCommandName() {
    var commandName = inputEle.value.split(" ")[0].split("/")[1]
    if (commandName === "") {
        return "undefined"
    } else {
        return inputEle.value.split(" ")[0].split("/")[1]
    }
}

// 获取当前列表名称
function getListName(model) {
    var listName = listEle.getAttribute("data-list-name")
    if (model === "display") {
        for (var i = 0; i < document.querySelectorAll("#getListName").length; i++) {
            document.querySelectorAll("#getListName")[i].innerHTML = listName
        }
    } else if (model == null) {
        return listName
    }
}

// 开始编写
function editBegin() {
    commandLength = inputEle.value.split(" ").length
    wikiEle.href = eval(`json.setting.${LANG}.other.commandURL`) + inputEle.value.split(" ")[0]
    listEle.setAttribute("data-finished", "false")
    copyFromInput("display")
    if (commandLength === 1) {
        loadList("command")
        grammarEle.innerHTML = ""
        noteEle.innerHTML = eval(`json.setting.${LANG}.other.beginText`)
    }
}

// 结束编写
function editEnd() {
    if (listEle.getAttribute("data-finished") === "true") {
        listEle.innerHTML = ""
        grammarEle.innerHTML = ""
        noteEle.innerHTML = eval(`json.setting.${LANG}.other.endText`)
        listEle.setAttribute("data-list-name", "none")
        copyFromInput("display")
    }
}

// 复制输入框内容
function copyFromInput(request) {
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
        if (listEle.getAttribute("data-finished") == "true") {
            wikiEle.style.display = "none"
            copyEle.style.display = ""
        } else {
            wikiEle.style.display = ""
            copyEle.style.display = "none"
        }
    }
}

// 添加新变量
function addToInput(request, str) {
    if (request === "command") {
        inputEle.value = document.querySelector('.mdui-list-item:hover').querySelector('.mdui-list-item-title').innerHTML        
    } else if (request === "none") {
        console.log("这只是个占位项")
    } else if (request === "byExhaustive") {
        inputEle.value += str
    } else if (request === "default") {
        inputEle.value = inputEle.value.split(" ", inputEle.value.split(" ").length - 1).join(" ") + " "
        inputEle.value += document.querySelector('.mdui-list-item:hover').querySelector('.mdui-list-item-title').innerHTML
    }
}

// 根据输入的内容检索列表
function search() {
    theLatestParameter = inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]
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
}

function loadList(listName, userContentDisplayRule) {
    if (listEle.getAttribute("data-list-name") !== `${listName}`) {
        listEle.innerHTML = ""
        function displayListImage(i, listName, dataName) {
            if (eval(`json.${dataName}.${LANG}.list.${listName}[i].image`) === undefined || eval(`json.${dataName}.${LANG}.list.${listName}[i].image`) === "" || eval(`json.${dataName}.${LANG}.list.${listName}[i].image`) === "none") {
                
                   listEle.querySelectorAll('.mdui-list-item')[i].removeChild(listEle.querySelectorAll('.mdui-list-item')[i].querySelector(".mdui-list-item-avatar"))  //需要自定义优化
                
            } else {
                return eval(`json.${dataName}mdui-list-item-avatar.${LANG}.list.${listName}[i].image`)
            }
        }
        function displayListAddRule(i, listName, dataName) {
            eval(`json.${dataName}.${LANG}.list.${listName}[i].add`)
        }
        function displayListName(i, listName, dataName) {
            if (eval(`json.${dataName}.${LANG}.list.${listName}[i].name`) === undefined || eval(`json.${dataName}.${LANG}.list.${listName}[i].name`) === "") {
                console.error(`列表 ${listName} 中，第 ${i} 项的“name”是必须的。`)
            } else {
                return eval(`json.${dataName}.${LANG}.list.${listName}[i].name`)
            }
        }
        function displayListInfo(i, listName, dataName) {
            if (eval(`json.${dataName}.${LANG}.list.${listName}[i].info`) === undefined) {
                return ""
            } else {
                return eval(`json.${dataName}.${LANG}.list.${listName}[i].info`)
            }
        }
        function displayListURL(i, listName, dataName) {
            var displayRule = eval(`json.${dataName}.${LANG}.list.${listName}[i].url`)
            if (displayRule === "search") {
                return eval(`json.setting.${LANG}.other.searchURL`) + eval(`json.${dataName}.${LANG}.list.${listName}[i].info`)
            } else if (displayRule === "name") {
                return eval(`json.setting.${LANG}.other.wikiURL`) + eval(`json.${dataName}.${LANG}.list.${listName}[i].name`)
            } else if (displayRule === "info") {
                return eval(`json.setting.${LANG}.other.wikiURL`) + eval(`json.${dataName}.${LANG}.list.${listName}[i].info`)
            } else if (displayRule === "command") {
                return eval(`json.setting.${LANG}.other.commandURL`) + eval(`json.${dataName}.${LANG}.list.${listName}[i].name`)
            } else if (displayRule === "none" || displayRule === undefined) {
                setTimeout(() => {
                   listEle.querySelectorAll('.mdui-list-item')[i].removeChild(listEle.querySelectorAll('.mdui-list-item')[i].querySelector("#listURL"))  //需要自定义优化
                }, 10)
            } else {
                return displayRule
            }
        }
        if (eval(`json.main.${LANG}`) !== undefined) {
            if (eval(`json.main.${LANG}.list`) !== undefined) {
                if (eval(`json.main.${LANG}.list.${listName}`) !== undefined) {
                    for (var i = 0; i < eval(`json.main.${LANG}.list.${listName}.length`); i++) {
                        listEle.innerHTML += `
                <li class="mdui-list-item mdui-ripple" id="${i}" name="">
                    <div class="mdui-list-item-avatar"><img src="${displayListImage(i, listName, "main")}"/></div>
                    <div class="mdui-list-item-content" onclick="addToInput('${eval(`json.main.${LANG}.list.${listName}[i].add`)}'); change();">
                        <div class="mdui-list-item-title" id="listName">${displayListName(i, listName, "main")}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line">
                            <span class="mdui-text-color-theme-text" id="listInfo">${displayListInfo(i, listName, "main")}</span>
                        </div>
                    </div>
                    <a class="mdui-btn mdui-btn-icon" href="${displayListURL(i, listName, "main")}" target="_blank" id="listURL">
                        <i class="mdui-icon material-icons mdui-text-color-black-icon">send</i>
                    </a>
                </li>`
                    }
                }
            }
        }
        listEle.setAttribute("data-list-name", `${listName}`)
        if (eval(`json.user.${LANG}`) !== undefined) {
            if (eval(`json.user.${LANG}.list`) !== undefined) {
                if (eval(`json.user.${LANG}.list.${listName}`) !== undefined) {
                    for (var i = 0; i < eval(`json.user.${LANG}.list.${listName}.length`); i++) {
                        listEle.innerHTML += `
                <li class="mdui-list-item mdui-ripple" id="${i}" name="">
                    <div class="mdui-list-item-avatar"><img src="${displayListImage(i, listName, "user")}"/></div>
                    <div class="mdui-list-item-content" onclick="addToInput('${eval(`json.user.${LANG}.list.${listName}[i].add`)}'); change();">
                        <div class="mdui-list-item-title" id="listName">${displayListName(i, listName, "user")}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line">
                            <span class="mdui-text-color-theme-text" id="listInfo">${displayListInfo(i, listName, "user")}</span>
                        </div>
                    </div>
                    <a class="mdui-btn mdui-btn-icon" href="${displayListURL(i, listName, "user")}" target="_blank" id="listURL">
                        <i class="mdui-icon material-icons mdui-text-color-black-icon">send</i>
                    </a>
                </li>`
                    }
                }
            }
        }
        exhaustive("judge")
        getListName("display")
    }
}

// 穷举助手
function exhaustive(request) {
    var activeTab
    // 判定该列表是否可以穷举
    if (request === "judge") {
        var exhaustiveItem = "locate" || "block"
        document.querySelector("#Exhaustive-card").style.display = "none"
        listEle.setAttribute("data-is-exhaustive", "false")
        if (listEle.getAttribute("data-list-name").split(",")[0] === exhaustiveItem) {  // 此段待更改
            mdui.snackbar({
                message: "此列表可以穷举（点击浮动按钮了解更多）",
                position: "left-top",
                timeout: 2000,
                closeOnOutsideClick: false
            })
            document.querySelector("#Exhaustive-card").style.display = ""
            activeTab = document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href
            listEle.setAttribute("data-is-exhaustive", "true")
            for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                listEle.querySelectorAll(".mdui-list-item")[i].innerHTML += `
                    <label class="mdui-checkbox">
                        <input type="checkbox"/>
                        <i class="mdui-checkbox-icon"></i>
                    </label>`
                listEle.querySelectorAll("label")[i].addEventListener("click", () => {
                    if (listEle.getAttribute("data-is-exhaustive") === "true") {
                        for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                            if (listEle.querySelectorAll(".mdui-list-item")[i].querySelector("input").checked == true) {
                                listEle.querySelectorAll(".mdui-list-item")[i].classList.add("mdui-list-item-active")
                            } else {
                                listEle.querySelectorAll(".mdui-list-item")[i].classList.remove("mdui-list-item-active")
                            }
                        }
                    }
                })
            }
        }
    }
    // 获取预设
    function getExhaustivePreinstall() {
        theLatestParameter = inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]        
    }
    // 输出
    function exhaustiveOutput() {
        var output = ""
        if (activeTab === "Exhaustive-tab1-byList") {
            
        } else if (activeTab === "Exhaustive-tab2-byInput") {
            for (var i = 0; i < document.querySelector(`${activeTab}`).querySelector("#setExhaustiveInput").value.split("\n").length; i++) {
                var exhaustiveItem = document.querySelector(`${activeTab}`).querySelector("#setExhaustiveInput").value.split("\n")[i]
                output += `${getExhaustivePreinstall()}${exhaustiveItem},`
            }
        }
        return output
    }
    // 根据 input 复选框的值高亮列表项
    function listActive() {
        if (listEle.getAttribute("data-is-exhaustive") === "true") {
            for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                if (listEle.querySelectorAll("input")[i].checked == true) {
                    listEle.querySelectorAll(".mdui-list-item")[i].classList.add("mdui-list-item-active")
                } else {
                    listEle.querySelectorAll(".mdui-list-item")[i].classList.remove("mdui-list-item-active")
                }
            }
        }
    }
    // 按钮
    if (listEle.getAttribute("data-is-exhaustive") == "true") {
        if (request === "selectAll") {  // 全选
            for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                listEle.querySelectorAll("input")[i].checked = true
                listActive()
            }
        } else if (request === "selectNone") {  // 全不选
            for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                listEle.querySelectorAll("input")[i].checked = false
                listActive()
            }
        } else if (request === "selectBack") {  // 反选
            for (var i = 0; i < listEle.querySelectorAll(".mdui-list-item").length; i++) {
                if (listEle.querySelectorAll("input")[i].checked == true) {
                    listEle.querySelectorAll("input")[i].checked = false
                    listActive()
                } else {
                    listEle.querySelectorAll("input")[i].checked = true
                    listActive()
                }
            }
        } else if (request === "preview") {  // 显示预览
            document.querySelector(`${activeTab}`).querySelector("#getExhaustivePreview").value = outputExhaustive()
        } else if (request === "add") {  // 添加
            addToInput("byExhaustive", outputExhaustive())
        }
    }
}

// 扩展工具
function extend(request) {
    if (request === "grammar") {
        
    } else if (request === "list") {
        
    }
}






















/**
 * 以下内容待改
 * 由于涉及核心操作，将于最后修改
 */

function change() {  // 切换页面数据
    commandLength = inputEle.value.split(" ").length
    editBegin()
    // /alwaysday
    if (getCommandName() == "alwaysday" && commandLength == 2) {
        loadList("boolean")
        grammarEle.innerHTML = `/alwaysday <strong><布尔值></strong>`
        noteEle.innerHTML = "指定是否开启昼夜更替。"
    } else if (getCommandName() == "alwaysday" && commandLength == 3) {
        listEle.setAttribute("data-finished", "true")        
    }
    // /daylock
    if (getCommandName() == "daylock" && commandLength == 2) {
        loadList("boolean")
        grammarEle.innerHTML = `/daylock <strong><布尔值></strong>`
        noteEle.innerHTML = "指定是否开启昼夜更替。"
    } else if (getCommandName() == "daylock" && commandLength == 3) {
        listEle.setAttribute("data-finished", "true")        
    }
    // /locate
    if (getCommandName() == "locate" && commandLength == 2) {
        loadList("locate")
        grammarEle.innerHTML = `/locate <strong><结构类型></strong>`
        noteEle.innerHTML = "指定要定位的结构。"
    } else if (getCommandName() == "locate" && commandLength == 3) {
        listEle.setAttribute("data-finished", "true")    
    }
    editEnd()
}
