export var json = {
    "execute": {
        "detect": [
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
    "tp": {
        "rotation": {
            "x": [
                {
                    "template": {
                        "input": {
                            "text": "{name} "
                        }
                    },
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
                    "info": "相对角度",
                    "input": {
                        "text": "{name}"
                    }
                },
                {
                    "name": "-90.0",
                    "info": "竖直向上"
                },
                {
                    "name": "90.0",
                    "info": "竖直向下"
                },
            ],
            "y": [
                {
                    "template": {
                        "input": {
                            "text": "{name} "
                        }
                    },
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
                    "info": "相对角度",
                    "input": {
                        "text": "{name}"
                    }
                },
                {
                    "name": "-180.0",
                    "info": "正北（与 180.0 重合）"
                },
                {
                    "name": "-90.0",
                    "info": "正东"
                },
                {
                    "name": "0.0",
                    "info": "正南"
                },
                {
                    "name": "90.0",
                    "info": "正西"
                }
            ]
        },
        "facing": [
            {
                "template": {}
            },
            {
                "name": "facing",
                "info": "指定朝向",
                "input": {
                    "text": "{name} "
                }
            }
        ]
    },
    "help": {
        "pageNumber": []
    }
}