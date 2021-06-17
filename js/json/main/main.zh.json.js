json.main.zh = {
    "list": {
        "boolean": [
            {
                "name": "false ",
                "info": "否",
                "url": "None",
                "add": "Default"
            },
            {
                "name": "true ",
                "info": "是",
                "url": "None",
                "add": "Default"
            }
        ],
        "command": [
            {
                "name": "/alwaysday ",
                "info": "锁定或解锁日夜循环。",
                "url": "Command",
                "add": "Command"
            },
            {
                "name": "/daylock ",
                "info": "锁定或解锁日夜循环。",
                "url": "Command",
                "add": "Command"
            },
            {
                "name": "/execute ",
                "info": "用于执行另一个命令，但是允许改变执行者、命令执行的位置和角度，添加限制执行条件。",
                "url": "Command",
                "add": "Command"
            },
            {
                "name": "/locate ",
                "info": "在聊天框中为命令执行者显示给定类型结构的最近坐标和距离。",
                "url": "Command",
                "add": "Command"
            },
            {
                "name": "/teleport ",
                "info": "传送实体（玩家、生物等）。",
                "url": "Command",
                "add": "Command"
            }
        ],
        "locate": [
            {
                "name": "bastionremnant ",
                "info": "堡垒遗迹",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "buriedtreasure ",
                "info": "埋藏的宝藏",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "endcity ",
                "info": "末地城",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "fortress ",
                "info": "下界要塞",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "mansion ",
                "info": "林地府邸",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "mineshaft ",
                "info": "废弃矿井",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "monument ",
                "info": "海底神殿",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "pillageroutpost ",
                "info": "掠夺者前哨站",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "ruinedportal ",
                "info": "废弃传送门",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "ruins ",
                "info": "海底废墟",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "shipwreck ",
                "info": "沉船",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "stronghold ",
                "info": "要塞",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "temple ",
                "info": "沙漠神殿",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "temple ",
                "info": "雪屋",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "temple ",
                "info": "丛林神庙",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "temple ",
                "info": "女巫小屋",
                "url": "Info",
                "add": "Default"
            },
            {
                "name": "village ",
                "info": "村庄",
                "url": "Info",
                "add": "Default"
            }
        ]
    },
    "grammar": {
        "alwaysday": [
            {
                "text": "[锁定：布尔值]",
                "note": "指定是否锁定昼夜更替。",
                "list": "boolean",
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
                "next": [
                    {
                        "text": "<执行坐标：x y z>",
                        "note": "指定命令运行的位置。",
                        "list": "xyz",
                        "next": [
                            {
                                "text": "<命令：命令>",
                                "note": "指定要运行的命令。",
                                "list": {
                                    "list": [
                                        "command"
                                    ],
                                    "more": [
                                        {
                                            "name": "detect",
                                            "info": "[不是指令] 检测方块。"
                                        }
                                    ]
                                },
                                "next": [
                                    "End"
                                ]
                            },
                            {
                                "text": "detect",
                                "note": "检测方块。",
                                "list": {
                                    "list": [
                                        "command"
                                    ],
                                    "more": [
                                        {
                                            "name": "detect",
                                            "info": "[不是指令] 检测方块。"
                                        }
                                    ]
                                },
                                "next": [
                                    {
                                        "text": "<探测坐标：x y z>",
                                        "note": "指定要检测方块的位置。",
                                        "list": "xyz",
                                        "next": [
                                            {
                                                "text": "<方块：方块>",
                                                "note": "指定要检测的方块ID。",
                                                "list": "block",
                                                "next": [
                                                    {
                                                        "text": "<数据：整数>",
                                                        "note": "指定要检测的方块的数据值。",
                                                        "list": "number",
                                                        "next": [
                                                            {
                                                                "text": "<命令：命令>",
                                                                "note": "指定要运行的命令。",
                                                                "list": "command",
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
                "exhaustive": true,
                "next": [
                    "End"
                ]
            }
        ],
        "demo": [
            {
                "text": "1",
                "next": [
                    {
                        "text": "1-1",
                        "next": [
                            {
                                "text": "1-1-1",
                                "next": [
                                    "End"
                                ]
                            }
                        ]
                    },
                    {
                        "text": "1-2",
                        "next": [
                            "End"
                        ]
                    }
                ]
            },
            {
                "text": "2",
                "next": [
                    {
                        "text": "2-1",
                        "next": [
                            {
                                "text": "2-1-1",
                                "next": [
                                    "End"
                                ]
                            },
                            {
                                "text": "2-1-2",
                                "next": [
                                    "End"
                                ]
                            }
                        ]
                    },
                    {
                        "text": "2-2",
                        "next": [
                            "End"
                        ]
                    }
                ]
            }
        ]
    }
}
