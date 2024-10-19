const { GUI, formatGUI } = require("./BetterChat/modules/gui");
const { getConfigData, getPlayerData, updatePlayerData } = require("./BetterChat/modules/data");
const event = require("./BetterChat/modules/event");
const Prefix = getConfigData('config', "Prefix");


mc.listen("onServerStarted", () => {
    const BetterChat = mc.newCommand("betterchat", "更好的聊天插件", PermType.Any);
    BetterChat.setAlias('bchat'); // 指令别名

    BetterChat.mandatory('player', ParamType.Player);
    BetterChat.optional('string', ParamType.String);

    BetterChat.setEnum('rename', ['rename']);
    BetterChat.mandatory('rename', ParamType.Enum, 'rename', 1);
    BetterChat.overload(['rename', 'player', 'string']);

    BetterChat.setEnum('setitle', ['setitle']);
    BetterChat.mandatory('setitle', ParamType.Enum, 'setitle', 1);
    BetterChat.overload(['setitle', 'player', 'string']);

    BetterChat.setEnum('cmd', ['gui', 'format']);
    BetterChat.mandatory('cmd', ParamType.Enum, 'cmd', 1);
    BetterChat.overload(['cmd']);

    BetterChat.setCallback((_cmd, ori, out, res) => {
        const Player = ori.player;

        if (res.cmd == "gui") {
            return Player ? GUI(Player) : out.error("控制台无法使用菜单");
        } else if (res.cmd == "format") {
            return Player ? formatGUI(Player) : out.error("控制台无法使用菜单");
        }
        
        const resPlayer = res.player[0];
        const contents = res.string;
        const playerObj = getPlayerData(resPlayer.realName);

        if (res.rename == "rename") {
            if (!Player.isOP() && resPlayer.realName != Player.realName) return out.error(Prefix + "你没有权限更改他人的昵称"); //判断是否为OP
            updatePlayerData(resPlayer.realName, contents, playerObj.title, "", 0);
            Player.tell(Prefix + resPlayer.realName + "的昵称已修改为: " + contents);
        }

        if (res.setitle == "setitle") {
            if (!Player.isOP()) return Player.tell(Prefix + "你没有权限设置称号"); //判断是否为OP
            updatePlayerData(resPlayer.realName, playerObj.nick, contents, "", 0);
            mc.broadcast(`${Prefix} "恭喜玩家" ${resPlayer.realName} "获得" ${contents} 称号`);
        }

    })

    BetterChat.setup();
});