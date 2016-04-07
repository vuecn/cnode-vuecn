require("./css/normalize.css")
require("./css/common.css")
require("./css/app.css")
require("./css/home.css")
require("./css/topic.css")
require("./css/layout-box.css")
require("./css/message.css")

import router from "./router"
import APP from "./app.vue"

router.start(APP, "#app")