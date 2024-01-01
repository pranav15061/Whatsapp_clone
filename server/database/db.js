import mongoose from "mongoose";

const URL="mongodb+srv://pranavbagal4:enp3AVxvhI4iIIsM@clone-whatsapp.qctf01s.mongodb.net/?retryWrites=true&w=majority";

const Connection= async()=>{
    try
    {
        // await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
         await mongoose.connect(URL);
         console.log("Database connection established");
    }
    catch(error)
    {
        console.log('Error: ', error.message);
    }
}

export default Connection;