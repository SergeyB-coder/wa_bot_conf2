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
                'phone', 
                phone, 
                { 'price': message.body } 
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
                { 'conditions': message.body } 
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

        else if (data_json[0].answer1 === '') {
          client.update('phone', phone, { 'answer1': message.body } 
            ).then(function(data) {
              console.log('update answer1', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer2 === '') {
          client.update('phone', phone, { 'answer2': message.body } 
            ).then(function(data) {
              console.log('update answer2', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer3 === '') {
          client.update('phone', phone, { 'answer3': message.body } 
            ).then(function(data) {
              console.log('update answer3', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer4 === '') {
          client.update('phone', phone, { 'answer4': message.body } 
            ).then(function(data) {
              console.log('update answer4', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer5 === '') {
          client.update('phone', phone, { 'answer5': message.body } 
            ).then(function(data) {
              console.log('update answer5', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer6 === '') {
          client.update('phone', phone, { 'answer6': message.body } 
            ).then(function(data) {
              console.log('update answer6', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer7 === '') {
          client.update('phone', phone, { 'answer7': message.body } 
            ).then(function(data) {
              console.log('update answer7', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer8 === '') {
          client.update('phone', phone, { 'answer8': message.body } 
            ).then(function(data) {
              console.log('update answer8', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer9 === '') {
          client.update('phone', phone, { 'answer9': message.body } 
            ).then(function(data) {
              console.log('update answer9', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer10 === '') {
          client.update('phone', phone, { 'answer10': message.body } 
            ).then(function(data) {
              console.log('update answer10', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer11 === '') {
          client.update('phone', phone, { 'answer11': message.body } 
            ).then(function(data) {
              console.log('update answer11', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer12 === '') {
          client.update('phone', phone, { 'answer12': message.body } 
            ).then(function(data) {
              console.log('update answer12', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer13 === '') {
          client.update('phone', phone, { 'answer13': message.body } 
            ).then(function(data) {
              console.log('update answer13', data);
            }, function(err){
              console.log(err);
            });
        }
        else if (data_json[0].answer14 === '') {
          client.update('phone', phone, { 'answer14': message.body } 
            ).then(function(data) {
              console.log('update answer14', data);
            }, function(err){
              console.log(err);
            });
        }
    }, function (err) {
        console.log(err);
    });
});

clientwa.initialize();