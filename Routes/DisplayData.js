const express=require('express')
const router=express.Router()
router.get('/foodData',(req,res)=>{
    try{
      // console.log(global.food_items)
      res.send([global.food_items,global.foodCategory])
    }catch(err) {
        console.log(err)
    }
})
module.exports=router