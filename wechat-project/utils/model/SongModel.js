// songDetail 返回的信息
module.exports = function SongModel(ret) {
    //this.id = ret.id;
    this.hash = ret.hash || '';  
    this.fileName = ret.fileName || '';           // 如："李玉刚 - 刚好遇见你"
    this.singerName = ret.singerName || '未知';  // 歌手名
    this.singerId = ret.singerId || '未知';     // 歌手的 ID
    this.songName = ret.songName || '未知';     // 歌名
    this.imgUrl = ret.imgUrl || '';    // 图片
    this.timeLength = ret.timeLength || '';    // 歌曲时间长度
    this.fileSize = ret.fileSize || '';       // 歌曲的大小
    this.url = ret.url || '';           // 资源路径
    this.status = ret.status || '';  
    this.mvhash = ret.mvhash || '';    // MV资源  --- hash
    this.extName = ret.extName || '';  // 歌曲的格式，如：mp3、m4a
    this.extra = ret.extra || '';     // 其它资源，不同大小的歌曲
}
