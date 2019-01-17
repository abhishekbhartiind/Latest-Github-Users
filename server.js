const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const github = require('./routes/github');


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Use Routes
app.use('/github', github);
app.use((req,res) => {
    res.status(404).send({error:"Seems invalid endpoint"})
});

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server running on port ${port}`));

if(!fs.existsSync('cache')){
    fs.mkdirSync('cache');
}
