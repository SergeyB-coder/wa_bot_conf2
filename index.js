const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

var sheetdb = require('sheetdb-node');

// create a config file
var config = {
    address: 'fdvo0jh0vaqar',
};

// Create new client
var client = sheetdb(config);

const question_name = `Привет, у меня есть крытые вагоны разной кубатуры в РФ и КЗХ.
Как Вас зовут?`

const question_company = `Из какой Вы компании?`

const question_role = `Вы Грузоотправитель? Экспедитор? Трейдер? Грузополучатель?`

const question_price = `Ваши маршруты, ценовые условия?`

const question_conditions = `Условия по ПРР?`

const message_thank = `Спасибо, мы обязательно свяжемся с Вами после выставки.
Напишите электронную почту.`




const clientwa = new Client(
    {
        authStrategy: new LocalAuth(),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            // executablePath: '/usr/bin/google-chrome-stable'
        }
    }
);

clientwa.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

clientwa.on('ready', () => {
    console.log('Client is ready!');
});

clientwa.on('message', message => {
    console.log('message', message)
    const phone = message.from
    //find phone
    client.read({ search: { phone: phone } }).then(function (data) {
        const data_json = JSON.parse(data)
        console.log('search phone: ', data_json, data_json.length);
        if (data_json.length === 0) {
            client.create({ phone: phone }).then(function (data) {
                console.log('create', data);

                clientwa.sendMessage(message.from, question_name)

            }, function (err) {
                console.log(err);
            });
        }
        else if (data_json[0].name === '') {
            client.update(
                'phone', // column name
                phone, // value to search for
                { 'name': message.body } // object with updates
              ).then(function(data) {
                console.log('update name', data);

                clientwa.sendMessage(message.from, question_role)

              }, function(err){
                console.log(err);
              });
        }
        else if (data_json[0].role === '') {
            client.update(
                'phone', // column name
                phone, // value to search for
                { 'role': message.body } // object with updates
              ).then(function(data) {
                console.log('update role', data);

                clientwa.sendMessage(message.from, question_price)

              }, function(err){
                console.log(err);
              });
        }
        else if (data_json[0].price === '') {
            client.update(
                'phone', // column name
                phone, // value to search for
                { 'price': message.body } // object with updates
              ).then(function(data) {
                console.log('update price', data);

                clientwa.sendMessage(message.from, question_conditions)

              }, function(err){
                console.log(err);
              });
        }
        else if (data_json[0].conditions === '') {
            client.update(
                'phone', // column name
                phone, // value to search for
                { 'conditions': message.body } // object with updates
              ).then(function(data) {
                console.log('update conditions', data);

                clientwa.sendMessage(message.from, message_thank)

              }, function(err){
                console.log(err);
              });
        }
        else if (data_json[0].email === '') {
            client.update(
                'phone', // column name
                phone, // value to search for
                { 'email': message.body } // object with updates
              ).then(function(data) {
                console.log('update email', data);

                // clientwa.sendMessage(message.from, message_thank)

              }, function(err){
                console.log(err);
              });
        }
    }, function (err) {
        console.log(err);
    });


    // clientwa.sendMessage(message.from, question_name)
});

clientwa.initialize();