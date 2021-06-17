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


// 根据URL参数执行
window.onload = () => {
    if (window.location.href.split("?").length > 1) {
        var arr = window.location.href.split("?")[1].split("&")
        for (var i = 0; i < arr.length; i++) {
            if (/setCommand=/g.test(arr[i]) === true) {
                inputEle.value = arr[i].split("=")[1].split("%20").join(" ")
                Change()
                mdui.snackbar({
                    message: "已根据URL参数自动设置指令",
                    position: "left-top",
                    timeout: 2000,
                    closeOnOutsideClick: false
                })
                return
            }
        }
        for (var i = 0; i < arr.length; i++) {
            if (/loadList=/g.test(arr[i]) === true) {
                var listName = arr[i].split("=")[1].split("%20")[0]
                var dataName = arr[i].split("=")[1].split("%20")[1]
                loadList(listName, dataName)
                mdui.snackbar({
                    message: "已根据URL参数自动加载列表",
                    position: "left-top",
                    timeout: 2000,
                    closeOnOutsideClick: false
                })
            }
        }
    }
}

// 获取当前指令的名称
function getCommandName() {
    var commandName = inputEle.value.split(" ")[0].split("/")[1]
    if (commandName === "") {
        return "undefined"
    } else {
        return inputEle.value.split(" ")[0].split("/")[1]
    }
}

// 开始编写
function editBegin() {
    commandLength = inputEle.value.split(" ").length
    wikiEle.href = eval(`json.setting.${LANG}.other.commandURL`) + inputEle.value.split(" ")[0]
    listEle.setAttribute("data-finished", "false")
    copy("display")
    if (commandLength === 1) {
        loadList("command", "main")
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
        copy("display")
    }
}

// 复制输入框内容
function copy(request) {
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
function add(request, str) {
    if (request === "Command") {
        inputEle.value = document.querySelector('.mdui-list-item:hover').querySelector('.mdui-list-item-title').innerHTML        
    } else if (request === "byExhaustive") {
        inputEle.value += str
    } else if (request === "Default") {
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
        if (listEle.querySelectorAll('#name')[i].innerHTML.startsWith(theLatestParameter) == true || eval("/" + theLatestParameter + "/g.test(listEle.querySelectorAll('#name')[i].innerHTML)") == true) {
            listEle.querySelectorAll('.mdui-list-item')[i].style.display = ""
            e++
        }
        if (e == 0) {
            if (listEle.querySelectorAll('#info')[i].innerHTML.startsWith(theLatestParameter) == true || eval("/" + theLatestParameter + "/g.test(listEle.querySelectorAll('#info')[i].innerHTML)") == true) {
                listEle.querySelectorAll('.mdui-list-item')[i].style.display = ""
            }
        }
    }
}

// 列表相关
function loadList(listName, dataName) {
    if (listEle.getAttribute("data-list-name") !== `${listName},${dataName}`) {
        listEle.innerHTML = ""
        listEle.setAttribute("data-list-name", `${listName},${dataName}`)
        if (eval(`json.${dataName}.${LANG}.list.${listName}`) !== undefined) {
            function setWikiURL(i, url) {
                if (url === "search") {
                    return eval(`json.setting.${LANG}.other.searchURL`) + eval(`json.${dataName}.${LANG}.list.${listName}[i].info`)
                } else if (url === "name") {
                    return eval(`json.setting.${LANG}.other.wikiURL`) + eval(`json.${dataName}.${LANG}.list.${listName}[i].name`)
                } else if (url === "info") {
                    return eval(`json.setting.${LANG}.other.wikiURL`) + eval(`json.${dataName}.${LANG}.list.${listName}[i].info`)
                } else if (url === "command") {
                    return eval(`json.setting.${LANG}.other.commandURL`) + eval(`json.${dataName}.${LANG}.list.${listName}[i].name`)
                } else if (url === "none") {
                   setTimeout(() => {
                       listEle.querySelectorAll('.mdui-list-item')[i].removeChild(listEle.querySelectorAll('.mdui-list-item')[i].querySelector("#listURL"))
                   }, 10)
                } else {
                    return eval(`json.${dataName}.${LANG}.list.${listName}[i].url`)
                }
            }
            for (var i = 0; i < eval(`json.${dataName}.${LANG}.list.${listName}.length`); i++) {
                listEle.innerHTML += `
                <li class="mdui-list-item mdui-ripple" id="${i}" name="${eval(`json.${dataName}.${LANG}.list.${listName}[i].name`)}">
                    <div class="mdui-list-item-content" onclick="add('${eval(`json.${dataName}.${LANG}.list.${listName}[i].add`)}'); change();">
                        <div class="mdui-list-item-title" id="name">${eval(`json.${dataName}.${LANG}.list.${listName}[i].name`)}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line">
                            <span class="mdui-text-color-theme-text" id="info">${eval(`json.${dataName}.${LANG}.list.${listName}[i].info`)}</span>
                        </div>
                    </div>
                    <a class="mdui-btn mdui-btn-icon" href="${setWikiURL(i, eval(`json.${dataName}.${LANG}.list.${listName}[i].url`))}" target="_blank" id="listURL">
                        <i class="mdui-icon material-icons mdui-text-color-black-icon">send</i>
                    </a>
                </li>`
            }
        } else if (eval(`json.user.${LANG}.list.${listName}`) !== undefined && dataName === "main") {
            loadList(listName, "user")
        }
        exhaustive("judge")
        // 更新 #getListName 内容
        for (var e = 0; e < document.querySelectorAll("#getListName").length; e++) {
            document.querySelectorAll("#getListName")[e].innerHTML = listName
        }
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
                listEle.querySelectorAll(".mdui-list-item")[i].innerHTML = `
                    <label class="mdui-checkbox">
                        <input type="checkbox"/>
                        <i class="mdui-checkbox-icon" style="margin-left: 9px;"></i>
                    </label>` + listEle.querySelectorAll(".mdui-list-item")[i].innerHTML
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
            add("byExhaustive", outputExhaustive())
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
        loadList("boolean", "main")
        grammarEle.innerHTML = `/alwaysday <strong><布尔值></strong>`
        noteEle.innerHTML = "指定是否开启昼夜更替。"
    } else if (getCommandName() == "alwaysday" && commandLength == 3) {
        listEle.setAttribute("data-finished", "true")        
    }
    // /daylock
    if (getCommandName() == "daylock" && commandLength == 2) {
        loadList("boolean", "main")
        grammarEle.innerHTML = `/daylock <strong><布尔值></strong>`
        noteEle.innerHTML = "指定是否开启昼夜更替。"
    } else if (getCommandName() == "daylock" && commandLength == 3) {
        listEle.setAttribute("data-finished", "true")        
    }
    // /locate
    if (getCommandName() == "locate" && commandLength == 2) {
        loadList("locate", "main")
        grammarEle.innerHTML = `/locate <strong><结构类型></strong>`
        noteEle.innerHTML = "指定要定位的结构。"
    } else if (getCommandName() == "locate" && commandLength == 3) {
        listEle.setAttribute("data-finished", "true")    
    }
    editEnd()
}
