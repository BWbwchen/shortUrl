const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { nanoid } = require('nanoid')
const pgp = require('pg-promise')()


const app = express()
const port = 3000

require('dotenv').config();
const db = pgp(process.env.DB_URL)

app.use(express.static('public'));

app.use(bodyParser())
app.use(bodyParser.json());

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
            res.redirect(data[0]["to_url"])
        }
    })
})

app.get('/', (req, res) => {
    // make short url
    res.sendFile(path.join('public', 'index.html'))
})


app.post('/api', (req, res) => {
    let customName = req.body.short_name

    if (customName == "") {
        customName = nanoid(5) 
    }

    // check duplicate 
    db.any(
        'SELECT * FROM url WHERE sub = $<wantInsert>',
        {
            wantInsert: customName
        }
    ).then((data) => {
        if (data.length == 0) {
            // can insert
            insertShortUrl(customName, req.body.url, res)
        } else {
            // do again
            res.json({
                checkCode: 100, // do again
                short_name: nanoid(5)
            })
        }
    })
})

function insertShortUrl (customName, url, res) {
    db.any(
        `INSERT INTO url (sub, to_url) VALUES ($<short_name>, $<url>)`, 
        {
            short_name: customName,
            url: url
        }
    ).then(() => {
        res.json({
            checkCode: 200,
            short_name : customName,
        })
    })
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
