const express = require("express")
const router = express.Router()
const candidate_controller = require("../controllers/candidate.controller")
const auth = require("../middlewares/auth")

router.post("/signup", candidate_controller.signup)

router.post("/signin", candidate_controller.signin)

router.post("/signout", candidate_controller.signout)

router.post("/signoutall", candidate_controller.signoutall)

router.post("/resetpassword", candidate_controller.resetpassword)

// verify user
router.put("/verify/:id", candidate_controller.verifyAccount)

// router.get("/test", candidate_controller.practicetest)

// attempt test with id
router.get("/test/:id", candidate_controller.attempttest)

// update candidate profile with id
router.put("/:id", candidate_controller.updateprofile)

router.get("/", candidate_controller.dashboard)

module.exports = router  // /home/x/Data/testhub/routes/candidate.route.js