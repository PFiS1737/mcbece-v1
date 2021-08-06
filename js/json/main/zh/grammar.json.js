export var json = [
    [
        {
            "command": {
                "name": "/^(\\/)?(\\?|help)$/",
                "info": "提供命令列表或单个命令的帮助信息"
            }
        },
        {
            "grammar": [
                {
                    "length": 1,
                    "text": "[页码：整数]",
                    "note": "指定命令列表的页码",
                    "list": "commands.help.pageNumber"
                }
            ]
        },
        {
            "grammar": [
                {
                    "length": 1,
                    "text": "<命令：字符串>",
                    "note": "指定需要提供帮助信息的命令",
                    "list": "command"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        'text': "/[a-z]/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?ability$/",
                "info": "赋予或剥夺玩家的能力"
            }
        },
        {
            "grammar": [
                {
                    "length": 1,
                    "text": "<玩家：目标>",
                    "note": "指定要赋予或剥夺能力的玩家",
                    "list": "select or"
                },
                {
                    "length": 2,
                    "text": "<能力：能力>",
                    "note": "指定要操作的能力",
                    "list": "ability"
                },
                {
                    "length": 3,
                    "text": "<值：布尔值>",
                    "note": "指定此能力是否对玩家可用",
                    "list": "boolean"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(alwaysday|daylock)$/",
                "info": "锁定或解锁日夜循环"
            }
        },
        {
            "grammar": [
                {
                    "length": 1,
                    "text": "[锁定：布尔值]",
                    "note": "指定是否锁定昼夜更替",
                    "list": "boolean"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(execute)$/",
                "info": "用于执行另一个命令，但是允许改变执行者、命令执行的位置和角度，添加限制执行条件"
            }
        },
        {
            "grammar": [
                {
                    "length": 1,
                    "text": "<执行源：目标>",
                    "note": "指定目标命令执行者",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "text": "<执行坐标：x y z>",
                    "note": "指定命令运行的位置",
                    "list": "coordinate"
                },
                {
                    "length": 5,
                    "text": "<命令：命令>",
                    "note": "指定要运行的命令",
                    "list": "command, commands.execute.detect"
                }
            ]
        },
        {
            "grammar": [
                {
                    "length": 1,
                    "text": "<执行源：目标>",
                    "note": "指定目标命令执行者",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "text": "<执行坐标：x y z>",
                    "note": "指定命令运行的位置",
                    "list": "coordinate"
                },
                {
                    "length": 5,
                    "text": "detect",
                    "note": "检测方块",
                    "list": "command, commands.execute.detect"
                },
                {
                    "length": 6,
                    "text": "<探测坐标：x y z>",
                    "note": "指定要检测方块的位置",
                    "list": "coordinate"
                },
                {
                    "length": 7,
                    "text": "<方块：方块>",
                    "note": "指定要检测的方块ID",
                    "list": "block"
                },
                {
                    "length": 8,
                    "text": "<数据：整数>",
                    "note": "指定要检测的方块的数据值",
                    "list": "block.data"
                },
                {
                    "length": 9,
                    "text": "<命令：命令>",
                    "note": "指定要运行的命令",
                    "list": "command"
                }
            ],
            "display": [
                {
                    "length": 5,
                    "rule": {
                        "type": "regex",
                        "text": "/^detect$/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(locate)$/",
                "info": "在聊天框中为命令执行者显示给定类型结构的最近坐标和距离"
            }
        },
        {
            "grammar": [
                {
                    "length": 1,
                    "text" : "<特性：字符串>",
                    "note": "指定要定位的结构",
                    "list": "locate"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(teleport|tp)$/",
                "info": "传送实体（玩家、生物等）"
            }
        },
        {
            "grammar": [
                {
                    "text": "<目的地：x y z>",
                    "note": "",
                    "list": "coordinate, selector"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean, commands.tp.rotation.y, commands.tp.facing"
                }
            ]
        },
        {
            "grammar": [
                {
                    "text": "<目的地：x y z>",
                    "note": "",
                    "list": "coordinate, selector"
                },
                {
                    "text": "[y旋转角度：角度]",
                    "note": "",
                    "list": "commands.tp.rotation.y"
                },
                {
                    "text": "[x旋转角度：角度]",
                    "note": "",
                    "list": "commands.tp.rotation.x"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 4,
                    "rule": {
                        "type": "regex",
                        "text": "/^[-~.0-9]+$/"
                    }
                }
            ]
        },
        {
            "grammar": [
                {
                    "text": "<目的地：x y z>",
                    "note": "",
                    "list": "coordinate, selector"
                },
                {
                    "text": "facing",
                    "note": "",
                    "list": "commands.tp.facing"
                },
                {
                    "text": "<指定朝向坐标：x y z>",
                    "note": "",
                    "list": "coordinate, selector"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 4,
                    "rule": {
                        "type": "regex",
                        "text": "/^facing$/"
                    }
                }
            ]
        },
        {
            "grammar": [
                {
                    "text": "<目的地：x y z>",
                    "note": "",
                    "list": "coordinate, selector"
                },
                {
                    "text": "facing",
                    "note": "",
                    "list": "commands.tp.facing"
                },
                {
                    "text": "<指定朝向实体：目标>",
                    "note": "",
                    "list": "selector"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 4,
                    "rule": {
                        "type": "regex",
                        "text": "/^facing$/"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "isSelector"
                    }
                }
            ]
        },
        {
            "grammar": [
                {
                    "text": "<目的地：目标>",
                    "note": "",
                    "list": "selector"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean, coordinate, selector"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/(^@|^[-~^.0-9]+$)/g"
                    }
                }
                
            ]
        },
        {
            "grammar": [
                {
                    "text": "<传送目标：目标>",
                    "note": "",
                    "list": "selector"
                },
                {
                    "text": "<目的地：目标>",
                    "note": "",
                    "list": "boolean, coordinate, selector"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isSelector"
                    }
                }
            ]
        },
        {
            "grammar": [
                {
                    "text": "<传送目标：目标>",
                    "note": "",
                    "list": "selector"
                },
                {
                    "text": "<目的地：x y z>",
                    "note": "",
                    "list": "coordinate"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean, commands.tp.rotation.y, commands.tp.facing"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^([-~.0-9]+|facing)$/"
                    }
                }
            ]
        },
        {
            "grammar": [
                {
                    "text": "<传送目标：目标>",
                    "note": "",
                    "list": "selector"
                },
                {
                    "text": "<目的地：x y z>",
                    "note": "",
                    "list": "coordinate"
                },
                {
                    "text": "[y旋转角度：角度]",
                    "note": "",
                    "list": "commands.tp.rotation.y"
                },
                {
                    "text": "[x旋转角度：角度]",
                    "note": "",
                    "list": "commands.tp.rotation.x"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "regex",
                        "text": "/^[-~.0-9]+$/"
                    }
                }
            ]
        },
        {
            "grammar": [
                {
                    "text": "<传送目标：目标>",
                    "note": "",
                    "list": "selector"
                },
                {
                    "text": "<目的地：x y z>",
                    "note": "",
                    "list": "coordinate"
                },
                {
                    "text": "facing",
                    "note": "",
                    "list": "commands.tp.facing"
                },
                {
                    "text": "<指定朝向坐标：x y z>",
                    "note": "",
                    "list": "coordinate, selector"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "regex",
                        "text": "/^facing$/"
                    }
                }
            ]
        },
        {
            "grammar": [
                {
                    "text": "<传送目标：目标>",
                    "note": "",
                    "list": ""
                },
                {
                    "text ": "<目的地：x y z>",
                    "note": "",
                    "list": "coordinate"
                },
                {
                    "text": "facing",
                    "note": "",
                    "list": "commands.tp.facing"
                },
                {
                    "text": "<指定朝向坐标：目标>",
                    "note": "",
                    "list": "selector"
                },
                {
                    "text": "[检查方块：布尔值]",
                    "note": "",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "regex",
                        "text": "/^facing$/"
                    }
                },
                {
                    "length": 6,
                    "rule": {
                        "type": "isSelector"
                    }
                }
            ]
        }
    ]
]