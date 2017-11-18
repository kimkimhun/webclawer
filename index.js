const async = require('async')
const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')

const items = [
    { name: 'zuka', url: 'http://rov.wikia.com/wiki/Zuka'}, 
    { name: 'preyta', url: 'http://rov.wikia.com/wiki/Preyta'}, 
    { name: 'murad', url: 'http://rov.wikia.com/wiki/Murad'}, 
    { name: 'valhein', url: 'http://rov.wikia.com/wiki/Valhein'}
]

const queue = async.queue((task, callback) => {
    request(task.url, (error, response, body) => {
        const $ = cheerio.load(body)
        const text = $('#mw-content-text p').text()
        fs.writeFile(task.name +'.txt' , body, (err) => {
            if(err){
                console.log(err)
                callback()
            }
            console.log('save file complete')
            callback()
        })
    })
}, 1)

queue.drain = () => {
    console.log('Complete')
}

queue.push(items)