// pages/index/index.js
var api = require('../../utils/KuGoumMusic.js');

Page({
  data: {
    list : [],     // 存储所有的歌曲
    isload : true,
    page : 1,
    play : {             // 当前播放曲目的相关信息
      playIndex : -1,    // 当前播放的曲目，即第几首
    },
    action : {},
    song:{}
  },

  //页面打开完毕后调用的回调
  onLoad: function () {
    var that = this;
    //使用微信提供的wx.request拉取接口数据
    wx.request({
      url: 'http://m.kugou.com/rank/info/',
      data: {
        rankid : 8888,
        page : that.data.page,
        json : true
      },
      header: {
        'Content-Type': 'application/json'
      },
      //接口请求成功后回调
      success: function(res) {
        that.setData({
          list : res.data.songs.list,
          isload : false,
        });
        //res.data.songs.list 为: [Object0、Object1、Object2 ......]  共30个
        //console.log(res.data.songs.list);
      }
    });
  },
  // 页面加载完成后
  onReady: function () {
    var that =this;
    var firSong = that.data.list[0].hash;
    api.songDetail(firSong,function(ret) {
      if(ret==false)return;   //若搜索失败，返回false
      console.log(ret);
      var url = ret.url;
      var imgUrl = ret.imgUrl;
      imgUrl = imgUrl.replace("{size}",'80');

      //设置正在播放的歌曲
      that.setData({
        play:{
          playIndex : 0,
          src:imgUrl,
          singerName:ret.singerName,
          songName:ret.songName
        },
      });
      //调用微信的API，播放背景音乐
      wx.playBackgroundAudio({
        dataUrl: url,
        title: ret.fileName
      });
    });
  },
  playSong: function(param){
    var that = this;
    //获取歌曲的id，id值是在标签上的data-hash值上
    var hash = param.currentTarget.dataset.hash;
    var index = param.currentTarget.dataset.id;

    //调用接口，获取歌曲实际的MP3地址
    wx.request({
      url : "http://m.kugou.com/app/i/getSongInfo.php",
      data : {
        cmd : "playInfo",
        hash : hash,
        from : "mkugou"
      },

      header: {
        'Content-Type': 'application/json'
      },

      success : function(ret){
        var url = ret.data.url;
        console.log(url);
        console.log(ret);

        var imgUrl = ret.data.imgUrl;
        imgUrl = imgUrl.replace("{size}",'80');

        //设置正在播放的歌曲
        that.setData({
          play:{
            playIndex: index,
            src:imgUrl,
            singerName:ret.data.singerName,
            songName:ret.data.songName
          },
        });

        //调用微信的API，播放背景音乐
        wx.playBackgroundAudio({
          dataUrl: url,
          title: that.data.list[index].filename
        });
      }
    });
  },
  songPause: function(){
    wx.pauseBackgroundAudio();

  },
  songPlay: function(){
    wx.playBackgroundAudio();
  },
  onHide:function(){
    console.log("Top500 页面隐藏");
    wx.pauseBackgroundAudio();
    // 页面隐藏
  },
})