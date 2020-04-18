const express = require("express")
const router = express.Router()
const company_controller = require("../controllers/company.controller")
const auth = require("../middlewares/auth")

router.post("/signup", company_controller.signup)

router.post("/signin", company_controller.signin)

router.post("/signout", company_controller.signout)

router.post("/signoutall", company_controller.signoutall)

router.post("/resetpassword", company_controller.resetpassword)

// verify user
router.put("/verify/:id", company_controller.verifyAccount)

// create test
router.post("/test", company_controller.createtest)

// delete test with id
router.delete("/test/:id", company_controller.deletetest)

// delete all tests
router.delete("/test", company_controller.deletetest)

// get test with id
router.get("/test/:id", company_controller.testresult)

// get all tests
router.get("/test", company_controller.testresult)

router.get("/", company_controller.dashboard)

module.exports = router // /home/x/Data/testhub/routes/company.route.js