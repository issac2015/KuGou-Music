module.exports = {
  //  api.songDetail('57B83EAF673D77EE21009CBD8FD05BD6',function(ret) {
  //     console.log(res);
  //  });
  songDetail: function (hash, callback) {
    //通过 hash 获取歌曲信息
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
            callback(ret.data);  //返回object
        },
        fail : function(){
            callback(false);     // 返回 false
        }
    });
  },
  search: function () {
    //http://mobilecdn.kugou.com/api/v3/search/song?format="jsonp"&keyword="繁星音乐盛典"&page=1&pagesize=30&showtype=1
    var argv = [].slice.call(arguments);
    var callback = argv.pop();

    var keyword = argv[0];   //歌名
    var pagesize = argv[1] || 30;  //每页多少首
    var page = argv[2] || 1;   
    var format = argv[3] || "String"; // 不提供该参数的更改作用
    var showtype = argv[4] || 1;

    wx.request({
        url : "http://mobilecdn.kugou.com/api/v3/search/song",
        data : {
          keyword:keyword,
          format : 'String',
          page : page,
          pagesize : pagesize,
          showtype:showtype
        },
        header: {
            'Content-Type': 'application/json'
        },
        success : function(ret){
            callback(ret.data);
        },
        fail : function(){
            callback(false);
        }
    });
   },

}
















