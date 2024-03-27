
const express = require("express");
const userRouter = require("./user");
const app = express();
const PORT = 3000;

const router = express.Router();

router.use("/user", userRouter)

module.exports = router;