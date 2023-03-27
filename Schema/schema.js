const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const clone=new Schema({
    PostImage:{type:String},
})
const model=mongoose.model("user1",clone);
module.exports=model;