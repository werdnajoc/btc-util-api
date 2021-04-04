const express = require('express')
const bodyParser = require('body-parser')
// const ethUtil = require('ethereumjs-util')
const bitcoreLib = require('bitcore-lib')
const app = express()

const port = 3000;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', function (req, res) {
  try {
    const success = bitcoreLib.PrivateKey.isValid(req.body.key);
    res.status(200).json({ success });
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message });
  }
});

app.post('/get-public', function (req, res) {
  try {
    const privateKey = new bitcoreLib.PrivateKey(req.body.key),
      publicKey = privateKey.toPublicKey();
    res.status(200).json({ publicKey });
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message });
  }
})

app.listen(port, () => console.log(`starting http://localhost:${port}`))
