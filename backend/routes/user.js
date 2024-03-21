
const zod = require("zod");
const { Human }= require("../db");
const JWT_SECRET = require("../config");
const express= require('express');
const userRouter= express.Router();
const jwt = require("jsonwebtoken");
const router = require(".");
//signup and signin routes

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req,res)=>{
    const body = req.body;
    const obj = signupSchema.safeParse(req.body);
    if(!obj.success){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = Human.findOne({
        username: body.username
    })

    if(user._id){
        return res.json({
                message: "Email already taken / Incorrect inputs"
        })
    }
    const dbUser= await Human.create(body); //create a new user
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET)
    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post("/signin", async (req,res)=>{
    const sucess = signinBody.safeParse(req.body);
    if(!sucess){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await Human.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })

})


module.exports = userRouter;