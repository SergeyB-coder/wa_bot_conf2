const fs = require('fs')
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const admin = '79108257989@c.us'
// const admin = '79024050778@c.us'
const igor = '79611601191@c.us'
const katya = '79301200905@c.us'
const serg = '79024050778@c.us'

const superadmin = '79024050778@c.us'

function getStopWords() {
    return fs.readFileSync('./test.txt', 'utf8').toString().split('\n')
}

function checkWordIsStop(message) {
    let stop_word = ''
    console.log('checkWordIsStop', message)
    const stop_words = getStopWords()
    console.log('checkWordIsStop', stop_words)
    let no_stop = true
    stop_words.forEach((word, index) => {
        if (word !== '')  no_stop = no_stop && !message.toLowerCase().includes(word)
        console.log('check word ', word, no_stop)

        if (!no_stop && word !== '') stop_word = word
    });
    console.log('checkword', message, stop_word)
    return stop_word
}

function addNewStopWord(new_word) {
    fs.appendFile('./test.txt', '\n' + new_word.toLowerCase(), (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('success add new word: ', new_word)
    })
}

const client = new Client(
    {
        authStrategy: new LocalAuth(),
        puppeteer: { 
            headless: true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: '/usr/bin/google-chrome-stable'
        }
    }
);

async function checkMedia (message, to) {
    if(message.hasMedia) {
        const media = await message.downloadMedia();
        client.sendMessage(to, media);
        client.sendMessage(superadmin, media);
    }

}

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    console.log('message', message)

    let is_message = true
    if (message.from === admin) {
        if (message.body.length > 3) {
            if (message.body.slice(0, 3) === '*7#') {
                is_message = false
                const new_word = message.body.slice(3)
                addNewStopWord(new_word)
            }
        }
    }

    
    if (is_message) {
        if (message.from === katya) {
            checkMedia(message, igor)
            console.log('message.from', katya)
            let stop_word = checkWordIsStop(message.body)
            if (stop_word) {
                client.sendMessage(admin, 'ATTENTION!!! stop word from Katya in message: ' + message.body + '\nCHAT - Deutz Vosda MMA: '+ stop_word);
                client.sendMessage(superadmin, 'ATTENTION'+katya);
            }
            else {
                let mess = 'Katya: ' + message.body
                client.sendMessage(igor, mess);

                client.sendMessage(superadmin, mess);
            }

        }
        else if (message.from === igor) {
            checkMedia(message, katya)
            console.log('message.from', igor)

            let stop_word = checkWordIsStop(message.body)
            if (stop_word) {
                client.sendMessage(admin, 'ATTENTION!!! stop word from Igor in message: ' + message.body + '\nCHAT - Deutz Vosda MMA: '+ stop_word);
                client.sendMessage(superadmin, 'ATTENTION'+katya);
            }
            else {
                let mess = 'Igor: ' + message.body
                client.sendMessage(katya, mess);

                client.sendMessage(superadmin, mess);
            }
        }

        // else if (message.from === serg) {
        //     checkMedia(message, katya)
        //     console.log('message.from', serg)
        //     if (checkWordIsStop(message.body)) {
        //         client.sendMessage(admin, 'ATTENTION!!! stop word from Igor in message: ', message.body);
        //         client.sendMessage(serg, 'ATTENTION'+katya);
        //     }
        //     else {
        //         let mess = 'Igor: ' + message.body
        //         client.sendMessage(igor, mess);

        //         client.sendMessage('79884054121@c.us', mess);
        //     }
        // }
        // else if (message.from === '79884054121@c.us') {
        //     let mess = 'Admin: ' + message.body
        //     client.sendMessage('79159975804@c.us', mess);
        //     client.sendMessage('79611601191@c.us', mess);
        //     client.sendMessage('79504460593@c.us', mess);
        // }
    }
});

// v3
client.initialize();
