module.exports = function PlaylistModel(raw) {
	this.playIndex = -1,    // 当前播放的曲目，即第几首
    this.timestamp = raw.timestamp;
    this.name = raw.name;
    this.type = raw.type;
    this.songList = raw.songList||[];
}







