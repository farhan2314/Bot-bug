const axios = require("axios");
const link = "https://salism3api.pythonanywhere.com";
const https = require('https');
const fs = require('fs');
const path = require('path');

axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const tulis = async (teks) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${link}/write`, {
        text: teks,
      })
      .then((res) => {
        console.log("Respons dari API:", res.data);
        // Simpan gambar ke folder Nigamedia/gambar
        const outputDir = path.join(__dirname, '..', 'Nigamedia', 'gambar');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const fileName = `nulis_${Date.now()}.jpg`;
        const filePath = path.join(outputDir, fileName);
        
        // Simpan gambar dari URL ke file lokal
        axios({
          method: 'get',
          url: res.data.images[0],
          responseType: 'stream'
        }).then(response => {
          console.log("Menyimpan gambar ke:", filePath);
          response.data.pipe(fs.createWriteStream(filePath))
            .on('finish', () => console.log("Gambar berhasil disimpan"))
            .on('error', (err) => console.error("Error saat menyimpan gambar:", err));
        });

        // Tambahkan path file ke dalam respons
        res.data.localPath = filePath;
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Error saat memanggil API:", err);
        reject(err);
      });
  });

module.exports = tulis;
