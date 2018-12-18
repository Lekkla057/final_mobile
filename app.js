const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('html', exphbs());
app.set('view engine', 'html');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/index', (req, res) => {
  res.render('index');
});
app.get('/all', (req, res) => {
  res.render('all');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/regist', (req, res) => {
  res.render('regist');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/in', (req, res) => {
  res.render('in');
});
app.get('/out', (req, res) => {
  res.render('out');
});
app.get('/rule', (req, res) => {
  res.render('rule');
});

app.post('/send', (req, res) => {
  const output = `
  
    <h3>เรียนคุณ</h3>
    <ul>  
      <li> ${req.body.name}</li>
    
      <li> ${req.body.email}</li>
      
    </ul>
    <h3>Message</h3>
    <p>กรุณารับ สติ๊กเกอร์ QR Code ที่ห้อง 1202A เวลาตั้งเเต่ 9.00 - 9.01 นาฬิกา ได้ภายใน 30 วัน</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'bell.b.love@gmail.com', // generated ethereal user
        pass: 'supavadimanasuvan'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:true
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"PSU Security" <bell.b.love@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Confirmed Register Document', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('all', {msg:'Email has been sent'});
  });
  });

app.listen(3000, () => console.log('Server started...'));
