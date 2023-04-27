const express = require('express')
const app = express()
const port = 5000
const mongoClient = require('./mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');

mongoClient();
// allow cross origin resourse sharing
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin' ,"http://localhost:3000");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With, Content-Type , Accept"
  );
  
  next();
})

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
//mount authentication router
app.use('/api' , require('./Routes/auth'));
app.use('/api',require('./Routes/validateCertificate'));
app.use('/api',require('./Routes/issueCertificate'));
app.use('/api',require('./Routes/contact'));
app.use('/api',require('./Routes/retriveCertificates'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})