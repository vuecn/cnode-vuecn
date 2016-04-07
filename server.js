var express = require("express")
var app = express()

app.use(express.static(__dirname))

// app.use(function (req, res, next) {
// 	if (req.path !== "/" || ! req.path.includes("build")) {
// 		res.sendFile(path.join(__dirname, "/index.html"))
// 	}

// 	next()
// })

app.listen(process.env.PORT || 8080)