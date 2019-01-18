const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const fs = require('fs');
const axios = require('axios');


const instance = axios.create({
    baseURL: constants.apiBaseUrl
});

// @route GET github/totalusers
// @desc Returns total number of github users
// @access Public
router.get('/totalusers',(req,res) => {
    try {
        if(!fs.existsSync('cache/totalusers.json') || 
        (Date.now() - Math.floor(fs.statSync('cache/totalusers.json').birthtimeMs)) >= constants.cacheInterval) {  
            instance.get('/search/users',{
                params: {
                  q: 'type:user'
                }
            }).then((response)=>{
                try {
                    fs.writeFileSync('cache/totalusers.json',JSON.stringify({totalUsers: response.data.total_count}))
                    } catch(err) {
                        console.log(err)
                    }
                res.send({totalUsers: response.data.total_count})
            }).catch((err)=>{
                console.log(err)
                res.status(403).json({error:'Something went wrong'})
            })

        } else {
            res.send(JSON.parse(fs.readFileSync('cache/totalusers.json')));
        }
    } catch(err) {
        console.log(err);
    }

})

// @route GET github/newusers
// @desc Returns 100 newest users
// @access Public
router.get('/newusers',(req,res) => {

        axios.get(constants.apiHost+"github/totalusers").then((response)=>{

            try {

                if(!fs.existsSync('cache/newusers.json') || (Date.now() - Math.floor(fs.statSync('cache/newusers.json').birthtimeMs)) >= constants.cacheInterval) {  
                    instance.get('/users',{
                        params: {
                          since: response.data.totalUsers - 100,
                          per_page: constants.perPage
                        }
                    }).then((response)=>{
                        try {
                            fs.writeFileSync('cache/newusers.json',JSON.stringify(response.data))
                            } catch(err) {
                                console.log(err)
                            }
                        res.send(response.data)
                    }).catch((err)=>{
                        console.log(err)
                        res.status(403).json({error:'Something went wrong'})
                    })
        
                } else {
                    res.send(JSON.parse(fs.readFileSync('cache/newusers.json')));
                }
                } catch(err) {
                    console.log(err);
                    res.status(403).json({error:'Something went wrong'})
                }

        }).catch((err)=>{
            console.log(err);
            res.status(403).json({error:'Something went wrong'})
        })


})

module.exports = router;