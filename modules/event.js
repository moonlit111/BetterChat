const { getConfigData, getPlayerData, updatePlayerData, apiParsing } = require("./data");
// const { PAPI } = require(`../../GMLIB-LegacyRemoteCallApi/lib/BEPlaceholderAPI-JS.js`);

mc.listen("onChat", (player, msg) => {//玩家消息
    const playerObj = getPlayerData(player.realName); // 获取玩家数据对象

    if (getConfigData('forbiddenWords').includes(msg)) { // 检查消息是否包含违禁词
        mc.broadcast(player.realName + " §c发送了敏感词汇§r"); //游戏内消息输出
        return false;
    }

    let strObj = playerObj.chat_format // 使用 replace 方法替换字符串中的占位符
        .replace(/\{player_name}/g, playerObj.nick)
        .replace(/\{player_msg}/g, msg)
        .replace(/\{player_titles}/g, playerObj.title ? `[${playerObj.title}§r] ` : "");

    strObj = apiParsing(strObj, player); // 解析API字符串

    updatePlayerData(player.realName, playerObj.nick, playerObj.title, msg, getConfigData('config', "Msg_duration")); // 更新玩家数据

    mc.broadcast(strObj);//游戏内消息输出

    return false;
})

// 监听玩家加入游戏事件
mc.listen('onPreJoin', (player) => {
    let playerObj = getPlayerData(player.realName); // 获取玩家数据

    let playerData = playerObj || { // 如果玩家数据不存在，则创建一个新的玩家数据对象
        name: player.realName,
        nick: player.realName,
        time: 0,
        title: null,
        message: null,
        chat_format: "{player_titles}<{player_name}> {player_msg}"
    };

    updatePlayerData(player.realName, playerData.nick, playerData.title, playerData.message, 0); // 更新玩家数据
});