/**
 * Created by maidou on 2017/2/5.
 */
/*
 * 定义构造函数
 * 初始化
 * 渲染页面
 * 绑定事件
 * 添加歌曲
 * 删除歌曲
 * */
function SongManager(parent,data) {
    this.parent = $(parent);
    this.data = data;
    this.init();
}
SongManager.prototype = {
    constructor: SongManager,
    //初始化
    init:function () {
        //此时this指向是SongManager的实例
        //渲染页面
        this.renderDom();
        //绑定事件
        this.bindEvent();
    },
    //渲染页面
    renderDom:function () {
        var that= this;
        var html = '<div class="songmanager-container">' +
                        '<h3>歌曲管理</h3>' +
                        '<div>' +
                            '歌曲名：<input type="text" id="songName">' +
                            '歌手名：<input type="text" id="singerName">' +
                            '<input type="button" value="添加" id="btnAdd">' +
                        '</div>' +
                        '<div class="songinfo-table">' +
                            '<div class="table-header">' +
                                '<span class="column-1">歌曲名称</span>' +
                                '<span class="column-2">歌手</span>' +
                                '<span class="column-3">操作</span>' +
                            '</div>' +
                            '<div class="table-body"></div>' +
                        '</div>' +
                    '</div>';

        $html = $(html);
        // this.data.forEach();
        $.each(that.data,function (index,data) {
            that.addSong(data.songName,data.singerName);
        });
        $html.appendTo(that.parent);

    },
    //绑定事件
    bindEvent:function () {
        var that = this;
        $('#btnAdd').click(function () {
            var $songName = $('#songName');
            var $singerName = $('#singerName');
            var songName=$songName.val();
            var singerName=$singerName.val();
            that.addSong(songName,singerName);
            $songName.val("");
            $singerName.val("");
        });
        //删除事件
        $('.table-body').on("click.deleteSong",".btnDelete",function () {
            //承接上下文
            that.deleteSong.call(this);
        })
    },
    //添加歌曲
    addSong:function (songName,singerName) {
        $html.find('.table-body').append('<div>' +
                '<span class="column-1">'+songName+'</span>' +
                '<span class="column-2">'+singerName+'</span>' +
                '<input type="button" value="删除" class="btnDelete">' +
            '</div>'
        );
    },
    //删除歌曲
    deleteSong:function () {
        $(this).parent().remove();
    }
    
}
