export var json = {
    "list": {
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
        "ability": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "worldbuilder",
                "info": "给予玩家成为世界建造者的能力"
            },
            {
                "name": "mayfly",
                "info": "给予飞行的能力"
            },
            {
                "name": "mute",
                "info": "将玩家禁言"
            }
        ],
        "block": [],
        "coordinate": {},
        "commands": {},
        "command": [],
        "locate": [],
        "selector": {}
    },
    "grammar": []
}