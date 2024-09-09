const ytdl = require('ytdl-core');

class YouTubeDownloader {
  constructor() {
    // Konstruktor kosong
  }

  isYTUrl(url) {
    return ytdl.validateURL(url);
  }

  async mp4(url) {
    try {
      const info = await ytdl.getInfo(url);
      const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

      return {
        title: info.videoDetails.title,
        date: new Date(info.videoDetails.publishDate).toLocaleDateString('id-ID'),
        duration: this.formatDuration(info.videoDetails.lengthSeconds),
        quality: format.qualityLabel,
        videoUrl: format.url
      };
    } catch (error) {
      console.error('Terjadi kesalahan saat mendapatkan info video:', error);
      throw error;
    }
  }

  formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":");
  }
}

module.exports = new YouTubeDownloader();
