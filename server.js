let axios = require('axios')
let fs = require("fs")
const JSON = require('circular-json');

axios.get('https://api.github.com/search/users?q=type%3Auser&per_page=100')
    .then(user => {
        //console.log(user)
       fs.writeFile("./user.json", JSON.stringify(user.data), (err) =>{
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
       })
        console.log(user.data.total_count)
        console.log(user.data.items.length)
    })
    .catch(err => console.log(err))

// List of users in file    
let userList = require('./user.json')
userList.items.forEach(element => {
    element = element.login
    console.log("users => " + element)
});
