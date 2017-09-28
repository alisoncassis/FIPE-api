const app = require('./config/express')

app.listen(process.env.PORT || 3000, function() {
    console.log(`server runnig at ${this.address().port}`)
})
