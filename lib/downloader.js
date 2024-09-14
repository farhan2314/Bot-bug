const ytdl = require('ytdl-core');
const ttdl = require("@tobyg74/tiktok-api-dl")
const igdl = require("instagram-url-direct")

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

class TikTokDownloader {
  constructor() {
    // Empty constructor
  }

  async download(url) {
    try {
      const result = await ttdl.tiktokdl(url);
      
      if (result.status !== 'success') {
        throw new Error('Failed to download TikTok video');
      }

      const videoInfo = result.result;

      return {
        username: videoInfo.author.username,
        description: videoInfo.description,
        duration: videoInfo.video.durationFormatted,
        video: videoInfo.video.noWatermark
      };
    } catch (error) {
      console.error('Error downloading TikTok video:', error);
      throw error;
    }
  }
}

module.exports = {
  youtube: new YouTubeDownloader(),
  tiktok: new TikTokDownloader()
};
