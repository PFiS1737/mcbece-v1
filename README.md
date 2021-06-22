# 基岩版命令编写助手 | MCBE Command Editer

## 制作中...
### 目前进度：




- 主要html：79%
    - 编写 article#about 对应的介绍文章
    - 编写 div#setting 对应的设置列表
- 主要js：70%
    - 更新 add() 函数
    - 完善 grammar() 函数
    - 大改 change() 函数
    - 编写 selector() 函数
    - 编写 setting.setLanguage() 函数
    - 编写 setting.setAppbarPosition() 函数
    - 编写 setting.setThemeColor() 函数
    - 编写 window.onload 事件，进行初始化
    - ...
- 主要json：5%
    - json.main.zh.list.command #指令 (只写了一点)
    - json.main.zh.list.selector.parameter #选择器变量
    - json.main.zh.list.selector.variable #选择器参数
    - json.main.zh.list.coordinate #坐标
    - json.main.zh.list.block #方块
    - json.main.zh.list.item #物品
    - json.main.zh.list.locate #结构 (完成)
    - json.main.zh.list.boolean #布尔值 (完成)
    - json.main.zh.list.gamemode #游戏模式
    - json.main.zh.list.gamerule #游戏规则
    - json.main.zh.list.enchanting #附魔
    - json.main.zh.list.effect #状态效果
    - json.main.zh.list.entity #实体
    - json.main.zh.list.event #生成事件
    - json.main.zh.list.time #时间
    - json.main.zh.list.sound #声音
    - json.main.zh.list.fog #迷雾
    - json.main.zh.list.animation #动作
    - json.main.zh.list.dimension #维度
    - json.main.zh.list.ride.model #ride命令的模式
    - json.main.zh.list.ride.teleport #ride命令中的传送规则
    - json.main.zh.list.ride.way #ride命令中的骑乘方式
    - json.main.zh.list.ride.rule #ride命令中的骑乘规则
    - json.main.zh.list.testforblocksModel #testforblocks命令的模式
    - json.main.zh.list.whether #天气
    - json.main.zh.list.
    - json.main.zh.list.
    - json.main.zh.grammar #指令语法
    - ...
- 优化：30%
    - 移动端Chrome浏览器地址栏变色 (完成)
    - 移动端工具对话框优化
        - 重构侧边栏的html
        - 根据页面宽度在页面初始化时执行
    - PWA(渐进式网络应用)优化 (完成)
    - 页面主题色切换
        - 编写 setting.setThemeColor() 函数
        - 尝试参照 [DFFZMXJ/mdui-colour-pad](https://github.com/DFFZMXJ/mdui-colour-pad) 写一个 html
    - 输入栏及语法提示栏上下位置切换
        - 编写 setting.setAppbarPosition() 函数
    - 切换页面语言的按钮
        - 编写 setting.setLanguage() 函数
    - 编写 exhaustive() 函数，对应穷举助手功能
    - 桌面端tab键支持
    - ...
- 自定义系统：10%
    - 目前仅写了写html，主体功能不能用，而且预计这html以后还要改
    - 这部分最后再说，先不管它
