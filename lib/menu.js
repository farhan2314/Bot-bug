// ./lib/menu.js

const fs = require('fs');

function generateMenu(XeonBotInc, m, pushname, xeonytimewisher, botname, ownername, typemenu) {
    const xeonmenuoh = `Hello ${pushname}
${xeonytimewisher} ${pushname}

*Android Bug ⚠️*
> xandroid 
> foxandroid2
> systemuicrash
> xsysui
*ios bug 🐛*
> xios
> xios2
*Group bug 🦠*
> xgc

*Owner menu 🔐*
> getsession
> deletesession
> pp
> join
> shutdown  
> restart
> autoread *[option]*
> autotyping *[option]*
> autorecording *[option]*
> autorecordtyp *[option]*
> autobio *[option]*
> autoswview *[option]*
> mode *[option]*
> block
> unblock 
> backup
> getcase
> addowner
> delowner
> bcgc

*Group Menu 👪*
> closetime
> opentime
> kick
> add
> promote
> demote
> setname
> setdesc
> setppgc
> tagall
> hidetag
> totag
> group *[option]*
> editinfo
> linkgc
> revoke
> listonline

*Main menu ❤️*
> menu
> buypremium  
> runtime
> owner

*Convert menu 🔄*
> sticker
> smeme
> take
> toimage
> tovideo
> toaudio
> tomp3
> tovn
> togif
> tourl
> toqr
> toviewonce
> fliptext
> emojimix

*Auto BGM,STICKER,PIC,VIDEO reply 📢*
> addvideo
> addimage
> addsticker
> addvn
> addzip
> addapk
> addpdf
> delvideo
> delimage
> delsticker
> delvn
> delzip
> delapk
> delpdf
> listvideo
> listimage
> liststicker
> listvn
> listzip
> listapk
> listpdf

*Download menu 📥*
> play
> ytmp3
> ytmp4
> sound1 - sound161`;

    return { xeonmenuoh, typemenu };
}

function sendMenu(XeonBotInc, m, menuData) {
    const { xeonmenuoh, typemenu } = menuData;

    if (typemenu === "v1") {
        XeonBotInc.sendMessage(
            m.chat,
            {
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
            },
            {
                quoted: m,
            }
        );
    } else if (typemenu === "v2") {
        XeonBotInc.sendMessage(
            m.chat,
            {
                video: fs.readFileSync("./Nigamedia/thumb2.mp4"),
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
            },
            {
                quoted: m,
            }
        );
    } else if (typemenu === "v3") {
        XeonBotInc.sendMessage(
            m.chat,
            {
                video: fs.readFileSync("./Nigamedia/thumb2.mp4"),
                caption: xeonmenuoh,
                gifPlayback: true,
            },
            {
                quoted: m,
            }
        );
    } else if (typemenu === "v4") {
        XeonBotInc.relayMessage(
            m.chat,
            {
                scheduledCallCreationMessage: {
                    callType: "AUDIO",
                    scheduledTimestampMs: 1200,
                    title: xeonmenuoh,
                },
            },
            {}
        );
    }
}

module.exports = { generateMenu, sendMenu };