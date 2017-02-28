// pages/music/music.js
var api = require('../../utils/KuGoumMusic.js');

Page({
  data: {
    list:[],
    isload:false,
    inputValue:"",
    audio:{
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '红颜泪',
      author: '刘涛',
      src: 'http://m2.music.126.net/f31lYdL8qd5jRy-Pwe2tCQ==/7978056372015474.mp3'
    }
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    console.log(this.audioCtx);
  },
 
  bindKeyInput: function(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  searchPlay: function (param) {
    var that = this;
    //获取歌曲的id，id值是在标签上的data-hash值上
    var hash = param.currentTarget.dataset.hash;
    //var index = param.currentTarget.dataset.id;

    api.songDetail(hash,function(ret) {
      console.log(ret);
      var imgUrl = ret.imgUrl;
      imgUrl = imgUrl.replace("{size}",'80');
      var songData={
        poster: imgUrl,
        name: ret.songName,
        author: ret.singerName,
        src: ret.url
      }
      that.setData({
        audio: songData
      });
      // 修改audio的src，设置起始位置，开始播放
      that.audioCtx.setSrc(imgUrl);
      that.audioCtx.seek(0);
      that.audioCtx.play();
    });
  },

  musicSerch: function (e) {
    var that = this;
    var val = e.target.dataset.val
    console.log(val)
    api.search(val,function(res) {
      if(res.data.info.length == 0){
        console.log("没有搜索到相关歌曲");
      }else{
        that.setData({
          list : res.data.info,
          isload : false,
        });
      }
    });
  },
  onHide:function(){
    console.log("页面隐藏");
    this.audioCtx.pause();
    // 页面隐藏
  },
})
