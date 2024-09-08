const fs = require('fs');

// Pra-render menu
const preRenderedMenu = `
┏━━━━『 BOT_NAME 』━━━━┓
┃                                  
┃ 👋 Halo, USER_NAME!
┃ TIME_WISH
┃ 👑 Pemilik: OWNER_NAME
┃
┣━━━━『 Menu Utama 』━━━━
┃
┃ ⚡ menu
┃ ⏱️ runtime
┃ 👤 owner
┃
┣━━━━『 Menu Bug 』━━━━━
┃
┃ 📱 Android:
┃    ╰ xandroid  foxandroid2
┃       systemuicrash  xsysui
┃ 🍎 iOS:
┃    ╰ xios  xios2
┃ 👥 Grup:
┃    ╰ xgc
┃
┣━━━━『 Menu Pemilik 』━━━
┃
┃ 🔐 getsession   deletesession
┃ 🖼️ pp           setbiobot
┃ 🏷️ setnamebot   join
┃ 🔄 shutdown     restart
┃ ⚙️ mode         autoread
┃ ⌨️ autotyping   autobio
┃ 🚫 block        unblock
┃ 💾 backup       addowner
┃ 🗑️ delowner     bcgc
┃
┣━━━━『 Menu Grup 』━━━━━
┃
┃ ⏰ closetime    opentime
┃ 👢 kick         add
┃ 👑 promote      demote
┃ 📝 setname      setdesc
┃ 🖼️ setppgc      tagall
┃ 🙈 hidetag      totag
┃ ⚙️ group        editinfo
┃ 🔗 linkgc       revoke
┃ 👥 listonline
┃
┣━━━━『 Menu Konversi 』━━
┃
┃ 🏷️ sticker      tts
┃ ✍️ nulis        smeme
┃ 🖼️ toimage      tovideo
┃ 🔊 toaudio      tomp3
┃ 🗣️ tovn         togif
┃ 🔗 tourl        toqr
┃ 👁️ toviewonce   fliptext
┃
┣━━━━『 Menu Unduhan 』━━
┃
┃ 🎵 play
┃ 🎧 ytmp3
┃ 🎬 ytmp4
┃ 🔊 sound1 - sound161
┃
┗━━━━━━━━━━━━━━━━━━━┛
`;

// Pra-load video
const menuVideo = fs.readFileSync("./Nigamedia/thumb2.mp4");

function generateMenu(XeonBotInc, m, pushname, xeonytimewisher, botname, ownername, typemenu) {
    const xeonmenuoh = preRenderedMenu
        .replace('BOT_NAME', botname)
        .replace('USER_NAME', pushname)
        .replace('TIME_WISH', xeonytimewisher)
        .replace('OWNER_NAME', ownername);

    return { xeonmenuoh, typemenu };
}

function sendMenu(XeonBotInc, m, menuData) {
    const { xeonmenuoh, typemenu } = menuData;

    const sendOptions = {
        v1: () => ({
            text: xeonmenuoh,
            contextInfo: {
                externalAdReply: {
                    title: botname,
                    body: ownername,
                    thumbnailUrl: "https://i.ibb.co/5hYWrRH/thumb.png",
                    sourceUrl: link,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                },
            },
        }),
        v2: () => ({
            video: menuVideo,
            gifPlayback: true,
            caption: xeonmenuoh,
            contextInfo: {
                externalAdReply: {
                    title: botname,
                    body: ownername,
                    thumbnailUrl: "https://i.ibb.co/5hYWrRH/thumb.png",
                    sourceUrl: ``,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                },
            },
        }),
        v3: () => ({
            video: menuVideo,
            caption: xeonmenuoh,
            gifPlayback: true,
        }),
        v4: () => ({
            scheduledCallCreationMessage: {
                callType: "AUDIO",
                scheduledTimestampMs: 1200,
                title: xeonmenuoh,
            },
        }),
    };

    const options = sendOptions[typemenu] ? sendOptions[typemenu]() : sendOptions.v1();

    if (typemenu === "v4") {
        XeonBotInc.relayMessage(m.chat, options, {});
    } else {
        XeonBotInc.sendMessage(m.chat, options, { quoted: m });
    }
}

module.exports = { generateMenu, sendMenu };