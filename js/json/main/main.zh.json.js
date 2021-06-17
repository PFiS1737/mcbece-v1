json.main.zh = {
    "list": {
        "boolean": [
            {
                "name": "false ",
                "info": "否",
                "url": "none",
                "add": "default"
            },
            {
                "name": "true ",
                "info": "是",
                "url": "none",
                "add": "default"
            }
        ],
        "command": [
            {
                "name": "/alwaysday ",
                "info": "锁定或解锁日夜循环。",
                "url": "command",
                "add": "command"
            },
            {
                "name": "/daylock ",
                "info": "锁定或解锁日夜循环。",
                "url": "command",
                "add": "command"
            },
            {
                "name": "/execute ",
                "info": "用于执行另一个命令，但是允许改变执行者、命令执行的位置和角度，添加限制执行条件。",
                "url": "command",
                "add": "command"
            },
            {
                "name": "/locate ",
                "info": "在聊天框中为命令执行者显示给定类型结构的最近坐标和距离。",
                "url": "command",
                "add": "command"
            },
            {
                "name": "/teleport ",
                "info": "传送实体（玩家、生物等）。",
                "url": "command",
                "add": "command"
            }
        ],
        "locate": [
            {
                "name": "bastionremnant ",
                "info": "堡垒遗迹",
                "url": "info",
                "add": "default"
            },
            {
                "name": "buriedtreasure ",
                "info": "埋藏的宝藏",
                "url": "info",
                "add": "default"
            },
            {
                "name": "endcity ",
                "info": "末地城",
                "url": "info",
                "add": "default"
            },
            {
                "name": "fortress ",
                "info": "下界要塞",
                "url": "info",
                "add": "default"
            },
            {
                "name": "mansion ",
                "info": "林地府邸",
                "url": "info",
                "add": "default"
            },
            {
                "name": "mineshaft ",
                "info": "废弃矿井",
                "url": "info",
                "add": "default"
            },
            {
                "name": "monument ",
                "info": "海底神殿",
                "url": "info",
                "add": "default"
            },
            {
                "name": "pillageroutpost ",
                "info": "掠夺者前哨站",
                "url": "info",
                "add": "default"
            },
            {
                "name": "ruinedportal ",
                "info": "废弃传送门",
                "url": "info",
                "add": "default"
            },
            {
                "name": "ruins ",
                "info": "海底废墟",
                "url": "info",
                "add": "default"
            },
            {
                "name": "shipwreck ",
                "info": "沉船",
                "url": "info",
                "add": "default"
            },
            {
                "name": "stronghold ",
                "info": "要塞",
                "url": "info",
                "add": "default"
            },
            {
                "name": "temple ",
                "info": "沙漠神殿",
                "url": "info",
                "add": "default"
            },
            {
                "name": "temple ",
                "info": "雪屋",
                "url": "info",
                "add": "default"
            },
            {
                "name": "temple ",
                "info": "丛林神庙",
                "url": "info",
                "add": "default"
            },
            {
                "name": "temple ",
                "info": "女巫小屋",
                "url": "info",
                "add": "default"
            },
            {
                "name": "village ",
                "info": "村庄",
                "url": "info",
                "add": "default"
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
