const input = document.querySelector('#edit')
const GRAMMAR = document.querySelector("#grammar")
const NOTE = document.querySelector("#note")
const list = document.querySelector("#list")
const WIKI = document.querySelector("#wiki")
const COPY = document.querySelector("#copy")

// 常量
const LANG = localStorage.getItem("language")

// 变量
var commandName
var theLatest
var inputLength

// 重定义 commandName
function getCommandName() {
    commandName = input.value.split(" ")[0].split("/")[1]
    if (commandName === "") {
        return "undefined"
    } else {
        return input.value.split(" ")[0].split("/")[1]
    }
}

// 复制输入框内容
function copy(model) {
    if (model === "copy") {
        input.select()
        input.setSelectionRange(0, input.value.length)
        document.execCommand('copy')
        mdui.snackbar({
            message: "已复制",
            position: "left-top",
            timeout: 2000,
            closeOnOutsideClick: false
        })
    } else if (model === "display") {
        if (list.getAttribute("data-finished") == "true") {
            WIKI.style.display = "none"
            COPY.style.display = ""
        } else {
            WIKI.style.display = ""
            COPY.style.display = "none"
        }
    }
}

// 更改语法提示内容
function Grammar(str) {
    if (eval(str.split("[", str.split("[").length - 1).join("[")) !== undefined) {
        if (eval(str.split("[", str.split("[").length - 1).join("[")).length > 1) {
            for (var e = 0; e < eval(str.split("[", str.split("[").length - 1).join("[")).length; e++) {
                str = str.split("[", str.split("[").length - 1).join("[") + `[${e}]`
                console.log(eval(`${str}.text`))
                Grammar(str + ".next[0]")
            }
        } else if (eval(str) !== "End") {
            console.log(eval(`${str}.text`))
            Grammar(str + ".next[0]")
        }
    }
}

// 添加新变量
function Add(model, str) {
    if (model === "command") {
        input.value = document.querySelector('.mdui-list-item:hover').querySelector('.mdui-list-item-title').innerHTML        
    } else if (model === "byExhaustive") {
        input.value += str
    } else{
        input.value = input.value.split(" ", input.value.split(" ").length - 1).join(" ") + " "
        input.value += document.querySelector('.mdui-list-item:hover').querySelector('.mdui-list-item-title').innerHTML
    }
}

// 根据输入的内容检索列表
function Search() {
    theLatest = input.value.split(" ")[input.value.split(" ").length - 1]
    var e = 0
    for (var i = 0; i < list.querySelectorAll('.mdui-list-item').length; i++) {
        list.querySelectorAll('.mdui-list-item')[i].style.display = "none"
        if (list.querySelectorAll('#name')[i].innerHTML.startsWith(theLatest) == true || eval("/" + theLatest + "/g.test(list.querySelectorAll('#name')[i].innerHTML)") == true) {
            list.querySelectorAll('.mdui-list-item')[i].style.display = ""
            e++
        }
        if (e == 0) {
            if (list.querySelectorAll('#info')[i].innerHTML.startsWith(theLatest) == true || eval("/" + theLatest + "/g.test(list.querySelectorAll('#info')[i].innerHTML)") == true) {
                list.querySelectorAll('.mdui-list-item')[i].style.display = ""
            }
        }
    }
}

// 列表相关
function List(listName, jsonName) {
    // 加载列表
    if (list.getAttribute("data-list-name") !== listName) {
        list.innerHTML = ""
        for (var i = 0; i < eval(`${LANG}.list.${listName}.length`); i++) {
            list.innerHTML += `
                <li class="mdui-list-item mdui-ripple" id="${i}" name="${eval(`${LANG}.list.${listName}[i].name`)}">
                    <div class="mdui-list-item-content" onclick="Add('${listName}'); Change();">
                        <div class="mdui-list-item-title" id="name">${eval(`${LANG}.list.${listName}[i].name`)}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line">
                            <span class="mdui-text-color-theme-text" id="info">${eval(`${LANG}.list.${listName}[i].info`)}</span>
                        </div>
                    </div>
                    <a class="mdui-btn mdui-btn-icon" target="_blank" id="wikiURL">
                        <i class="mdui-icon material-icons mdui-text-color-black-icon">send</i>
                    </a>
                </li>`
        }
        document.querySelector("#Exhaustive-card").style.display = "none"
        list.setAttribute("data-list-name", listName)
        list.setAttribute("data-is-exhaustive", "false")
        // 更新 #getListName 内容
        for (var e = 0; e < document.querySelectorAll("#getListName").length; e++) {
            document.querySelectorAll("#getListName")[e].innerHTML = listName
        }
        // 工具提示
        if (listName === "locate") {
            mdui.snackbar({
                message: "此列表可以穷举，点击浮动按钮了解更多。",
                position: "left-top",
                timeout: 2000,
                closeOnOutsideClick: false
            })
            document.querySelector("#Exhaustive-card").style.display = ""
            list.setAttribute("data-is-exhaustive", "true")        
            for (var x = 0; x < list.querySelectorAll(".mdui-list-item").length; x++) {
                list.querySelectorAll(".mdui-list-item")[x].innerHTML = `
                    <label class="mdui-checkbox">
                        <input type="checkbox"/>
                        <i class="mdui-checkbox-icon" style="margin-left: 9px;"></i>
                    </label>` + list.querySelectorAll(".mdui-list-item")[x].innerHTML
                list.querySelectorAll("i.mdui-checkbox-icon")[x].addEventListener("click", () => {
                    document.querySelector(".mdui-list-item.mdui-checkbox-icon:hover").classList.toggle("mdui-list-item-active")
                })
            }
        }
    }
}

// 穷举助手
function Exhaustive(model) {
    var activeTab = document.querySelector("#Exhaustive-tool").querySelector(".mdui-tab-active").href.split("#")[1]
    function getExhaustivePreinstall() {
        theLatest = input.value.split(" ")[input.value.split(" ").length - 1]        
    }
    function exhaustiveOutput() {
        var output = ""
        if (activeTab === "Exhaustive-tab1-byList") {
            
        } else if (activeTab === "Exhaustive-tab2-byInput") {
            for (var i = 0; i < document.querySelector(`#${activeTab}`).querySelector("#setExhaustiveInput").value.split("\n").length; i++) {
                var exhaustiveItem = document.querySelector(`#${activeTab}`).querySelector("#setExhaustiveInput").value.split("\n")[i]
                output += `${getExhaustivePreinstall()}${exhaustiveItem},`
            }
        }
        return output
    }
    if (list.getAttribute("data-is-exhaustive") == "true") {
        if (model === "selectAll") {
            for (var i = 0; i < list.querySelectorAll(".mdui-list-item").length; i++) {
                list.querySelectorAll("input")[i].checked = true
            }
        } else if (model === "selectNone") {
            for (var i = 0; i < list.querySelectorAll(".mdui-list-item").length; i++) {
                list.querySelectorAll("input")[i].checked = false
            }
        } else if (model === "selectBack") {
            for (var i = 0; i < list.querySelectorAll(".mdui-list-item").length; i++) {
                if (list.querySelectorAll("input")[i].checked == true) {
                    list.querySelectorAll("input")[i].checked = false
                } else {
                    list.querySelectorAll("input")[i].checked = true
                }
            }
        } else if (model === "preview") {
            document.querySelector(`#${activeTab}`).querySelector("#getExhaustivePreview").value = outputExhaustive()
        } else if (model === "add") {
            Add("byExhaustive", outputExhaustive())
        }
    }
}

// 扩展工具
function Extend(request, model) {
    if (request === "grammar") {
        
    } else if (request === "list") {
        
    }
}






















/**
 * 以下内容待改
 * 由于涉及核心操作，将于最后修改
 */

function Change() {  // 切换页面数据
    inputLength = input.value.split(" ").length
    list.setAttribute("data-finished", "false")
    copy("display")
    // 开始编写
    if (input.value.split(" ").length == 1) {
        List("command")
        GRAMMAR.innerHTML = ""
        NOTE.innerHTML = "请选择一个指令开始编写"
        WIKI.href = "https://minecraft.fandom.com/zh/wiki/命令" + input.value.split(" ")[0]        
    }
    // 结束编写
    function End() {
        list.innerHTML = ""
        GRAMMAR.innerHTML = ""
        NOTE.innerHTML = "已完成编写"
        list.setAttribute("data-list-name", "none")
        list.setAttribute("data-finished", "true")
        copy("display")
    }
    // /alwaysday
    if (getCommandName() == "alwaysday" && inputLength == 2) {
        List("boolean")
        GRAMMAR.innerHTML = `/alwaysday <strong><布尔值></strong>`
        NOTE.innerHTML = "指定是否开启昼夜更替。"
        WIKI.href = "https://minecraft.fandom.com/zh/wiki/命令" + input.value.split(" ")[0]        
    } else if (getCommandName() == "alwaysday" && inputLength == 3) {
        End()
    }
    // /daylock
    if (getCommandName() == "daylock" && inputLength == 2) {
        List("boolean")
        GRAMMAR.innerHTML = `/daylock <strong><布尔值></strong>`
        NOTE.innerHTML = "指定是否开启昼夜更替。"
        WIKI.href = "https://minecraft.fandom.com/zh/wiki/命令" + input.value.split(" ")[0]        
    } else if (getCommandName() == "daylock" && inputLength == 3) {
        End()
    }
    // /locate
    if (getCommandName() == "locate" && inputLength == 2) {
        List("locate")
        GRAMMAR.innerHTML = `/locate <strong><结构类型></strong>`
        NOTE.innerHTML = "指定要定位的结构。"
        WIKI.href = "https://minecraft.fandom.com/zh/wiki/命令" + input.value.split(" ")[0]        
    } else if (getCommandName() == "locate" && inputLength == 3) {
        End()
    }
}