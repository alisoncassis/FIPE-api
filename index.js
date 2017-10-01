const app = require('./config/express')

app.listen(process.env.PORT || 3000, function() {
    console.log(`server running at ${this.address().port}`)
})
