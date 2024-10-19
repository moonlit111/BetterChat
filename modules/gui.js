const { getConfigData, getPlayerData, updatePlayerData, apiParsing, Info } = require("./data");

function GUI(player) {//插件菜单
    var fm = mc.newSimpleForm();
    fm.setTitle('BetterChat');
    fm.addButton("还没做完");
    player.sendForm(fm,
        function (pla, id) {

        })
}

function setNickGUI(player) {//设置名称
    let playerList = []
    const data = Info.get("data") || [];
    for (let i in data) {
        playerList.push(data[i].name)
    }
    var fm = mc.newCustomForm();
    fm.setTitle('BetterChat')
    fm.addDropdown('选择玩家', playerList)
    fm.addInput('输入新称号', "例如: 小男娘 小萝莉")
    player.sendForm(fm,
        function (pla, id) {
            if (id != null) {

            }
        })
}

function setTitleGUI(player) {//设置称号
    let playerList = []
    const data = Info.get("data") || [];
    for (let i in data) {
        playerList.push(data[i].name)
    }
    var fm = mc.newCustomForm();
    fm.setTitle('BetterChat')
    fm.addDropdown('选择玩家', playerList)
    fm.addInput('输入新称号', "例如: 小男娘 小萝莉")
    player.sendForm(fm,
        function (pla, id) {
            if (id != null) {

            }
        })
}

function formatGUI(player) {//玩家菜单
    var fm = mc.newSimpleForm();
    fm.setTitle('BetterChat');
    fm.addButton("还没做完");
    player.sendForm(fm,
        function (pla, id) {

        })
}

module.exports = {
    GUI,
    formatGUI
}