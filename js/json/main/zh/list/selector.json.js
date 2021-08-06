export var json = {
    "next": [
        {
            "template": {}
        },
        {
            "name": "[",
            "info": "使用参数",
            "input": {
                "replace": "none",
                "text": "{name}"
            }
        },
        {
            "name": "",
            "info": "下一项",
            "input": {
                "replace": "none",
                "text": " "
            }
        }
    ],
    "next_variable": [
        {
            "template": {}
        },
        {
            "name": ",",
            "info": "下一个参数",
            "input": {
                "replace": "none",
                "text": "{name}"
            }
        },
        {
            "name": "]",
            "info": "结束",
            "input": {
                "replace": "none",
                "text": "{name} "
            }
        }
            ],
    "parameter": [
        {
            "template": {
                "url": "{command_page}",
                "input": {
                    "text": "{name}"
                }
            }
        },
        {
            "name": "@p",
            "info": "选择最近的玩家。"
        },
        {
            "name": "@r",
            "info": "选择随机玩家。"
        },
        {
            "name": "@a",
            "info": "选择所有玩家，包括已死亡玩家。"
        },
        {
            "name": "@e",
            "info": "选择所有实体（包含玩家），不包含死亡的实体。"
        },
        {
            "name": "@s",
            "info": "选择该命令的执行者（唯一的），包括已死亡玩家。"
        },
        {
            "name": "@c",
            "info": "[仅教育版] 选择自己的吉祥物。‌‌"
        },
        {
            "name": "@v",
            "info": "[仅教育版] 选择所有的吉祥物。‌‌"
        }
    ],
    "variable": [
        {
            "template": {
                "url": "{command_page}",
                "input": {
                    "replace": "the_latest_selector_variable",
                    "text": "{name}="
                }
            }
        },
        {
            "name": "x",
            "info": "指定X轴基准点。",
            "value": []
        },
        {
            "name": "y",
            "info": "指定Y轴基准点。",
            "value": []
        },
        {
            "name": "z",
            "info": "指定Z轴基准点。",
            "value": []
        },
        {
            "name": "r",
            "info": "通过最大距离选择目标。",
            "value": []
        },
        {
            "name": "rm",
            "info": "通过最小距离选择目标。",
            "value": []
        },
        {
            "name": "dx",
            "info": "指定X轴延伸距离。",
            "value": []
        },
        {
            "name": "dy",
            "info": "指定Y轴延伸距离。",
            "value": []
        },
        {
            "name": "dz",
            "info": "指定Z轴延伸距离。",
            "value": []
        },
        {
            "name": "scores",
            "info": "通过计分项选择目标。",
            "value": []
        },
        {
            "name": "tag",
            "info": "通过标签选择目标。",
            "value": []
        },
        {
            "name": "c",
            "info": "指定数量并选择距离最近的目标。",
            "value": []
        },
        {
            "name": "l",
            "info": "通过最大经验等级选择目标。",
            "value": []
        },
        {
            "name": "lm",
            "info": "通过最小经验等级选择目标。",
            "value": []
        },
        {
            "name": "m",
            "info": "通过游戏模式选择目标。",
            "value": []
        },
        {
            "name": "name",
            "info": "通过名称选择目标。",
            "value": []
        },
        {
            "name": "rx",
            "info": "通过最大垂直旋转角度选择目标。",
            "value": []
        },
        {
            "name": "rxm",
            "info": "通过最小垂直旋转角度选择目标。",
            "value": []
        },
        {
            "name": "ry",
            "info": "通过最大水平旋转角度选择目标。",
            "value": []
        },
        {
            "name": "rym",
            "info": "通过最小水平旋转角度选择目标。",
            "value": []
        },
        {
            "name": "type",
            "info": "通过实体类型选择目标。",
            "value": []
        },
        {
            "name": "family‌‌",
            "info": "通过家族选择目标。",
            "value": []
        }
    ]
}