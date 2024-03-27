
const zod = require("zod");
const { User }= require("../db");
const JWT_SECRET = require("../config");
const express= require('express');
const userRouter= express.Router();
const jwt = require("jsonwebtoken");
const router = require("./index");
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
    const user = User.findOne({
        username: body.username
    })

    if(user._id){
        return res.json({
                message: "Email already taken / Incorrect inputs"
        })
    }
    const dbUser= await User.create(body); //create a new user
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET)
    res.json({
        message: "User created successfully",
        token: token
    })
})

//sigin route 
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

    const user = await User.findOne({
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


//update routes
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
   })
router.put("/",authMiddleware, async (req,res)=>{
    const sucess = updateBody.safeParse(req.body);
    if(!sucess){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    
    await User.updateOne({_id: req.userId}, req.body);
    res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk", async (res,req)=>{
    const filter= req.query.filter || "";

    const users = User.findOne({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName:{
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})







module.exports = userRouter;