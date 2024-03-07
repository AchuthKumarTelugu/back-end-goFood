const express=require('express')
const router=express.Router()
const Order=require('../models/Orders')
router.post('/orderData',async (req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    //check if email is there
    
        const eid=await Order.findOne({'email':req.body.email})
        if (eid==null) {
            try {
                await Order.create({
                    email:req.body.email,
                    order_data:[data]
                   }).then(response=>{
                    res.status(200).json({success:true})
                   })
            } catch (error) {
                console.log('server error',error)
            }
               
        }else{
            try {
                await Order.findOneAndUpdate({email:req.body.email},{
                    $push:{order_data:data}
                }).then(()=>{
                    res.status(200).json({success:true})
                })
            } catch (error) {
                console.log('Server error',error)
            }
        }
   
   
})
router.post('/myOrderData',async (req,res)=>{
    try {
        const myData=await Order.findOne({email:req.body.email})
        res.json({orderData:myData})
    } catch (error) {
        console.log(error.message)
    }
    
})
module.exports=router