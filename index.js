const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const pgp = require('pg-promise')()
const db = pgp(connect)


app.use(express.static('public'));


app.get('/:id', (req, res) => {
    db.any(
        'SELECT * FROM url WHERE sub = $<id>',
        {
            id : req.params.id
        }
    ).then((data) => {
        if (data.length == 0) {
            res.sendFile(path.join(__dirname, 'public/index.html'))
        } else {
            res.redirect(data[0].to_url)
        }
    })
})

app.get('/', (req, res) => {
    // make short url
    res.sendFile(path.join('public', 'index.html'))
})


app.post('/api', (req, res) => {

    console.log("i receive")
    db.any(
        'SELECT * FROM url'
    ).then((data) => {
        if (data.length == 0) {
            res = ""
        } else {
            res.json(data)
        }
    })
    /*
    return db.any(
        'INSERT INTO url (sub, to_url) VALUES ($<short_name>, $<url>)', 
        {
            short_name: ,
            url: 
        })
        */
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
