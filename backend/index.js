const express = require("express");
const rootRouter = require("./routes/index");
const { Human } = require("./db");
const app = express();
const PORT = 3000;


app.use("/api/v4", rootRouter);
app.use(cors());
app.use(express.json());


app.listen(PORT, ()=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is listening on ${PORT}`);
})

 