export var json = {
    "list": {
        "next": [
            {
                "template": {}
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
        "coordinate": {
            "x": [
                {
                    "template": {},
                    "value": [
                        {
                            "template": {}
                        },
                        {
                            "name": "",
                            "info": "下一项",
                            "input": {
                                "replace": "none",
                                "text": " "
                            }
                        }
                    ]
                },
                {
                    "name": "~",
                    "info": "相对坐标",
                    "input": {
                        "text": "{name}"
                    }
                },
                {
                    "name": "^",
                    "info": "局部坐标",
                    "input": {
                        "text": "{name}"
                    }
                }
            ],
            "y": [
                {
                    "template": {},
                    "value": [
                        {
                            "template": {}
                        },
                        {
                            "name": "",
                            "info": "下一项",
                            "input": {
                                "replace": "none",
                                "text": " "
                            }
                        }
                    ]
                },
                {
                    "name": "~",
                    "info": "相对坐标",
                    "input": {
                        "text": "{name}"
                    }
                },
                {
                    "name": "^",
                    "info": "局部坐标",
                    "input": {
                        "text": "{name}"
                    }
                }
            ],
            "z": [
                {
                    "template": {},
                    "value": [
                        {
                            "template": {}
                        },
                        {
                            "name": "",
                            "info": "下一项",
                            "input": {
                                "replace": "none",
                                "text": " "
                            }
                        }
                    ]
                },
                {
                    "name": "~",
                    "info": "相对坐标",
                    "input": {
                        "text": "{name}"
                    }
                },
                {
                    "name": "^",
                    "info": "局部坐标",
                    "input": {
                        "text": "{name}"
                    }
                }
            ]
        },
        "boolean": [
            {
                "template": {}
            },
            {
                "name": "false",
                "info": "否",
                "input": {
                    "text": "{name} "
                }
            },
            {
                "name": "true",
                "info": "是",
                "input": {
                    "text": "{name} "
                }
            }
        ],
        "commands": {
            "execute": [
                {
                    "template": {}
                },
                {
                    "name": "detect",
                    "info": "[不是命令] 检测方块。",
                    "input": {
                        "text": "{name} "
                    }
                }
            ]
        },
        "command": [
            {
                "template": {
                    "url": "{command_page}{name}",
                    "input": {
                        "replace": "all",
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "/alwaysday",
                "info": "锁定或解锁日夜循环。"
                
            },
            {
                "name": "/daylock",
                "info": "锁定或解锁日夜循环。"
            },
            {
                "name": "/execute",
                "info": "用于执行另一个命令，但是允许改变执行者、命令执行的位置和角度，添加限制执行条件。"
            },
            {
                "name": "/locate",
                "info": "在聊天框中为命令执行者显示给定类型结构的最近坐标和距离。"
            },
            {
                "name": "/teleport",
                "info": "传送实体（玩家、生物等）。"
            }
        ],
        "locate": [
            {
                "template": {
                    "url": "{normal_page}{info}",
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "bastionremnant",
                "info": "堡垒遗迹"
            },
            {
                "name": "buriedtreasure",
                "info": "埋藏的宝藏"
            },
            {
                "name": "endcity",
                "info": "末地城"
            },
            {
                "name": "fortress",
                "info": "下界要塞"
            },
            {
                "name": "mansion",
                "info": "林地府邸"
            },
            {
                "name": "mineshaft",
                "info": "废弃矿井"
            },
            {
                "name": "monument",
                "info": "海底神殿"
            },
            {
                "name": "pillageroutpost",
                "info": "掠夺者前哨站"
            },
            {
                "name": "ruinedportal",
                "info": "废弃传送门"
            },
            {
                "name": "ruins",
                "info": "海底废墟"
            },
            {
                "name": "shipwreck",
                "info": "沉船"
            },
            {
                "name": "stronghold",
                "info": "要塞"
            },
            {
                "name": "temple",
                "info": "沙漠神殿"
            },
            {
                "name": "temple",
                "info": "雪屋"
            },
            {
                "name": "temple",
                "info": "丛林神庙"
            },
            {
                "name": "temple",
                "info": "女巫小屋"
            },
            {
                "name": "village",
                "info": "村庄"
            }
        ],
        "selector": {
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
                            "replace": "none",
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
    },
    "grammar": {
        "alwaysday": [
            {
                "text": "[锁定：布尔值]",
                "note": "指定是否锁定昼夜更替。",
                "list": "boolean",
                "length": 1,
                "next": [
                    "End"
                ]
            }
        ],
        "daylock": [
            {
                "text": "[锁定：布尔值]",
                "note": "指定是否锁定昼夜更替。",
                "list": "boolean",
                "length": 1,
                "next": [
                    "End"
                ]
            }
        ],
        "execute": [
            {
                "text": "<执行源：目标>",
                "note": "指定目标命令执行者。",
                "list": "selector",
                "length": 1,
                "next": [
                    {
                        "text": "<执行坐标：x y z>",
                        "note": "指定命令运行的位置。",
                        "list": "coordinate",
                        "length": 2,
                        "next": [
                            {
                                "text": "<命令：命令>",
                                "note": "指定要运行的命令。",
                                "judge": "/ /",
                                "length": 5,
                                "list": "commands.execute, command",
                                "next": [
                                    "End"
                                ]
                            },
                            {
                                "text": "detect",
                                "note": "检测方块。",
                                "judge": "/detect/g",
                                "length": 5,
                                "list": "commands.execute, command",
                                "next": [
                                    {
                                        "text": "<探测坐标：x y z>",
                                        "note": "指定要检测方块的位置。",
                                        "list": "coordinate",
                                        "length": 6,
                                        "next": [
                                            {
                                                "text": "<方块：方块>",
                                                "note": "指定要检测的方块ID。",
                                                "list": "block",
                                                "length": 9,
                                                "next": [
                                                    {
                                                        "text": "<数据：整数>",
                                                        "note": "指定要检测的方块的数据值。",
                                                        "list": "block.data",
                                                        "length": 10,
                                                        "next": [
                                                            {
                                                                "text": "<命令：命令>",
                                                                "note": "指定要运行的命令。",
                                                                "list": "commands.execute, command",
                                                                "length": 11,
                                                                "next": [
                                                                    "End"
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "locate": [
            {
                "text": "<特性：字符串>",
                "note": "指定要定位的结构。",
                "list": "locate",
                "length": 1,
                "next": [
                    "End"
                ]
            }
        ],
        "teleport": [
            {
                "text": "<目的地：x y z>",
                "note": "",
                "judge": "/ /",
                "list": "coordinate",
                "length": 1,
                "next": [
                    {
                        "text": "[检查方块：布尔值]",
                        "note": "",
                        "judge": "/ /",
                        "list": "boolean",
                        "length": 4,
                        "next": [
                            "End"
                        ]
                    },
                    {
                        "text": "[y旋转角度：角度]",
                        "note": "",
                        "judge": "/~[0-9]/g",
                        "list": "",
                        "length": 4,
                        "next": [
                            {
                                "text": "[x旋转角度：角度]",
                                "note": "",
                                "list": "",
                                "length": 5,
                                "next": [
                                    {
                                        "text": "[检查方块：布尔值]",
                                        "note": "",
                                        "list": "boolean",
                                        "length": 6,
                                        "next": [
                                            "End"
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "text": "facing",
                        "note": "",
                        "judge": "/facing/g",
                        "list": "",
                        "length": 4,
                        "next": [
                            "End"
                        ]
                    }
                ]
            },
            {
                "text": "<目的地：目标>",
                "note": "",
                "judge": "/@/g",
                "list": "selector",
                "length": 1,
                "next": [
                    "End"
                ]
            },
            {
                "text": "<传送目标：目标>",
                "note": "",
                "judge": "/@/g",
                "list": "selector",
                "length": 1,
                "next": [
                    "End"
                ]
            }
        ]
    }
}