# 文档 | 简体中文

> 目录
> - 介绍
> - 文件结构
> - JS 结构
> - [自定义](#自定义)
> - ...

# 介绍

为广大 Minecraft 基岩版命令爱好者准备的在线命令辅助编辑器。
- 部署
    - 本项目全部使用原生 HTML、JS、CSS 编写，纯静态环境，无需任何服务端知识即可完成部署
    - （主要原因是我不会 [doge]）
    - 本项目使用 Vercel 进行在线部署

## 功能

...

# 文件结构

```
(root)



```

# 自定义

> 你需要能熟练使用 JSON，并对 JavaScript 有一定理解  
> 你可能需要对本项目的 JS 有一定了解

## 文件

### Json 结构

```javascript
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

```javascript
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
    ```javascript
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
    - **必填，否则会出现 JSON 语法错误**
- `list_name[0]`
    - 每个列表的第一项为配置项，不会加载进网页
    - **必填，否则会报错**
    - `name`、`version`和`minecraft_version`
        - 列表的名称、版本和对于的游戏版本，基本没用，仅用做注释
        - `name`与`list_name`无关
    - `template`
        - 模板
        - **必填，否则会报错**
        - 可以有`template.url`、`template.input`和`template.auto_next_list`
        - 若在列表项中重新声明，将覆盖模板中的内容
- `image`
    - 列表项图片

- `name`
    - 列表项的名称
    - **必填，否则会报错**
    - 但可以为`""`
- `info`
    - 列表项的信息
    - 若`name`的值为`""`，它会垂直居中整个列表项
- `url`
    - 列表项对应的链接
    - 可以用`{name}`调用此列表项的`name`
    - 可以用`{info}`调用此列表项的`info`
    - 可以用`{command_page}`调用`page.json.main.${LANG}.text.url.command_page`的内容
    - 可以用`{normal_page}`调用`page.json.main.${LANG}.text.url.normal_page`的内容
    - 可以用`{search_page}`调用`page.json.main.${LANG}.text.url.search_page`的内容
    - 它可以写在`template`中
- `input`
    - 点击列表项后输入到输入栏的内容及规则
    - `input.replace`规定了它的替换规则
        - 为`"all"`将会替换整个输入栏的内容
        - 为`"none"`将不替换任何内容
        - 不填或填其他内容将会替换输入栏中最新的一个命令参数（`page.inputEle.getParameterByLength("the_latest_command_parameter")`）
    - `input.text`规定了最终会添加进输入栏的内容
        - 可以用`{name}`调用此列表项的`name`
        - 可以用`{info}`调用此列表项的`info`
    - 它可以写在`template`中
- `auto_next_list`'
    - 规定自动切换的下一个列表
    - 使用后点击列表将不再触发`page.chang()`而是以`page.listEle.load('...')`代替
    - 它的内容应该为一个或多个列表名称，例如上文中的`block`和`coordinate.x`
    - 它可以写在`template`中
- 一个可以正常加载的空列表应该为
    - 不包含任何项
    - 可以包含配置项
    - 如果包含列表项，则**必须**有配置项，且配置项中必须有`template`，否则会报错
    - 即：
    ```javascript
    // good
    "list_name": []
    
    // good
    "list_name": [
    	{
    		"template": {...}
    	}
    ]
    
    // good
    "list_name": [
	    {}
    ]
    
    // good
    "list_name": [
    	{
    		"template": {...}
    	},
    	{
    		"name": "",
    		...
    	}
    ]
    
    // error
    "list_name": [
    	{
    		"name": "",
    		...
    	}
    ]
    
    // error
    "list_name": [
    	{},
    	{
    		"name": "",
    		...
    	}
    ]
    ```