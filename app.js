const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");
const app = express();
const cors =require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

 //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
//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/blogs", blogRouter);



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 
module.exports = app;