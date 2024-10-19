/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            佛祖保佑       永无BUG
*/

const { getConfigData, getPlayerData, updatePlayerData, getPlayerList, Info } = require("./data");
const Prefix = getConfigData('config', "Prefix");

/**
 * 显示 BetterChat 插件的主菜单给玩家
 * @param {Object} player - 发送表单的玩家对象
 * @returns {void} - 该函数不返回任何值
 */
function GUI(player) {//插件菜单
    var fm = mc.newSimpleForm(); //创建表单对象

    fm.setTitle('BetterChat');
    fm.addButton("修改名称");
    fm.addButton("修改称号");
    if (player.isOP()) fm.addButton("修改聊天格式");

    player.sendForm(fm,
        function (pla, id) {
            switch (id) {
                case 0:
                    setNickGUI(pla)
                    break;
                case 1:
                    setTitleGUI(pla)
                    break;
                case 2:
                    formatGUI(pla)
                    break;
            }
        })
}

/**
 * 设置名称
 * @param {Object} player - 发送表单的玩家对象
 * @returns {void} - 该函数不返回任何值
 */
function setTitleGUI(player) {//设置名称
    const playerList = getPlayerList(); // 获取在线玩家对象列表
    var fm = mc.newCustomForm(); //创建表单对象

    fm.setTitle('BetterChat');
    fm.addDropdown('选择玩家', playerList);
    fm.addInput('输入新称号', "例如: 小男娘 小萝莉");

    player.sendForm(fm,
        function (pla, id) {
            if (id != null) {
                const playerName = playerList[id[0]]; // 被操作的玩家名称
                const playerObj = getPlayerData(playerName); // 获取玩家数据对象
                const contents = id[1]; // 回调的输入内容

                if (!pla.isOP()) return pla.tell(Prefix + "你没有权限更改称号"); // 滤出非OP玩家
                updatePlayerData(playerName, playerObj.nick, contents, playerObj.messagem, 0, playerObj.chat_format);
                mc.broadcast(`${Prefix} "恭喜玩家" ${playerName} "获得" ${contents} 称号`);
            }
        })
}

/**
 * 设置称号
 * @param {Object} player - 发送表单的玩家对象
 * @returns {void} - 该函数不返回任何值
 */
function setNickGUI(player) {//设置称号
    const playerList = getPlayerList(); // 获取在线玩家对象列表
    var fm = mc.newCustomForm(); //创建表单对象

    fm.setTitle('BetterChat');
    fm.addDropdown('选择玩家', playerList);
    fm.addInput('输入名称', "例如: 小男娘 小萝莉");

    player.sendForm(fm,
        function (pla, id) {
            if (id != null) {
                const playerName = playerList[id[0]]; // 被操作的玩家名称
                const playerObj = getPlayerData(playerName); // 获取玩家数据对象
                const contents = id[1]; // 回调的输入内容

                if (!pla.isOP() && playerName != pla.name) return pla.tell(Prefix + "你没有权限更改他人的名称"); // 防止非OP玩家更改他人名称
                updatePlayerData(playerName, contents, playerObj.title, playerObj.messagem, 0, playerObj.chat_format);
                pla.tell(Prefix + playerName + "的昵称已修改为: " + contents);
            }
        })
}

/**
 * 修改聊天格式-获取数据
 * @param {Object} player - 发送表单的玩家对象
 * @returns {void} - 该函数不返回任何值
 */
function formatGUI(player) { // 修改聊天格式
    const playerList = getPlayerList(); // 获取在线玩家对象列表
    var fm = mc.newCustomForm(); //创建表单对象

    fm.setTitle('BetterChat');
    fm.addDropdown('选择玩家', playerList);

    player.sendForm(fm,
        function (pla, id) {
            if (!pla.isOP()) return pla.tell(Prefix + '你无权使用'); // 滤出非OP玩家
            if (id != null) setformatGUI(pla, playerList[id[0]]); // 获取数据后转到设置格式菜单
        })
}

/**
 * 修改聊天格式-修改
 * @param {Object} player - 发送表单的玩家对象
 * @param {string} playerName - 被操作的玩家名称
 * @returns {void} - 该函数不返回任何值
 */
function setformatGUI(player, playerName) { // 修改聊天格式
    const playerObj = getPlayerData(playerName); // 获取玩家数据对象
    var fm = mc.newCustomForm(); //创建表单对象

    fm.setTitle('BetterChat');
    fm.addInput('输入新的聊天格式', "{player_titles} {player_name}>> {player_msg}", playerObj.chat_format);
    fm.addLabel('注:\n{player_titles}是称号\n{player_name}是玩家名称\n{player_msg}是玩家消息\n这些是只有聊天格式有的 你也可以结合使用其他插件支持的api');

    player.sendForm(fm,
        function (pla, id) {
            if (id != null) {
                updatePlayerData(playerName, playerObj.nick, playerObj.title, playerObj.messagem, 0, id[0]);
                pla.tell(Prefix + '修改成功！');
            }
        })
}

module.exports = {
    GUI,
    formatGUI
}