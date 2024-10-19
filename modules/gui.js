function GUI(player) {//插件菜单
    var fm = mc.newSimpleForm();
    fm.setTitle('BetterChat');
    fm.addButton("还没做完");
    player.sendForm(fm,
        function (pla, id) {

        })
}

module.exports = {
    GUI
}