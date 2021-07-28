# 文档 | 简体中文

> 目录
> - ...
> - [自定义](#自定义)
> - ...

# 自定义

> 你需要能熟练使用 JSON，并对 JavaScript 有一定理解  
> 你可能需要对本项目的 JS 有一定了解（阅读 [#JS结构](#JS结构)）

## 文件

### Json 结构

```js
// custom.js
{
    "language": {
        "list"; {
            ...
        },
        "grammar": {
            ...
        }
    }
}
```
### 解析

- `language`
    - 语言简写
- `list`
    - 列表
- `grammar`
    - 命令语法
    - 暂不支持自定义

## 列表

### Json 结构

```js
"list_name": [
    {
        "name": "",
        "version": "",
        "minecraft_version": ""
        "template": {
            "url": "",
            "input": {
                "replace": "",
                "text": ""
            },
            "auto_next_list": ""
        }
    }
    {
        "image": "",
        "name": "",
        "info": "",
        "url": "",
        "input": {
            "replace": "",
            "text": ""
        },
        "auto_next_list": ""
    }
    {
        ...
    }
    ...
]
```

### 解析

- `list_name`
    - 列表的名词，调用时需输入该列表相对"list"的位置
    - 例：有两个个列表为
```js
"list": {
    "block": [
        ...
    ],
    "coordinate": {
        "x": [
            ...
        ]
    }
}
```
    - 那么，它应该为`block`和`coordinate.x`
- `list_name[0]`
    - 每个列表的第一项为配置项，不会加载进网页
    - 必填，否则会报错
    - `name`、`version`和`minecraft_version`
        - 列表的名称、版本和对于的游戏版本，基本没用，仅用做注释
        - `name`与`list_name`无关
    - `template`
        - 模板
        - 必填，否则会报错
        - 可以有`template.url`、`template.input`和`auto_next_list`
- `image`
    - 列表项图片

- `name`
    - 列表项的名称
    - 必填，否则会报错，但可以为`""`
- `info`
    - 列表项的信息
    - 若`name`的值为`""`，它会垂直居中整个列表项
- `url`
    - 列表项对应的链接
    - 可以用`{name}`调用此列表项的`name`
    - 可以用`{info}`调用此列表项的`info`
    - 可以用`{command_page}`调用`page.text.${LANG}.url.command_page`的内容
    - 可以用`{normal_page}`调用`page.text.${LANG}.url.normal_page`的内容
    - 可以用`{search_page}`调用`page.text.${LANG}.url.search_page`的内容
    - 它可以写在`template`中
- `input`
    - 点击列表项后输入到输入栏的内容及规则
    - `.replace`规定了它的替换规则
        - 为`"all"`将会替换整个输入栏的内容
        - 为`"none"`将不替换任何内容
        - 不填或填其他内容将会替换输入栏中最新的一个命令参数（`page.inputEle.getParameterByLength("theLatest")`）
    - 它可以写在`template`中
- `auto_next_list`'
    - 规定自动切换的下一个列表
    - 使用后点击列表将不再触发`page.chang()`而是以`page.listEle.load('...')`代替
    - 它的内容应该为一个或多个列表名称，例如上文中的`block`和`coordinate.x`
    - 多个列表需用逗号隔开，逗号后需空格，即`, `，否则可能出现加载不全的问题（不会报错），详见下文详解
    - 它可以写在`template`中

### 详解





## 语法

### Json 结构

```js
"command_name": {
    "text"
    "note"
    "list"
}
```