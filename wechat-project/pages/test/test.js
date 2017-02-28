// pages/test/test.js

Page({
  data:{
    inputValue:"",
    dataserach:""
  },
  test: function(myval){
    this.setData({
        dataserach:myval
    })
  },

  bindKeyInput: function(e){
    this.setData({
      inputValue:e.detail.value
    })
  },


  bindButtonTap: function(e){
    var that = this;

    var val = e.target.dataset.val
    //console.log(val)

    wx.request({
      url: 'https://xy2.gm.163.com/cgi-bin/csa/csa_sprite.py?act=ask&product_name=dh2&question='+val, 
      data: '',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        var article = '';
        article = res.data.answer.replace("&lt;","&lt");
        //article = article.replace("&gt",">");
        console.log(article);

        console.log(res.data.answer);
        WxParse.wxParse('article', 'html', article, that,5);

        that.setData({
          dataserach:res.data.answer
        })
      }
    })

  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})