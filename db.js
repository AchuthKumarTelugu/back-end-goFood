const mongoose = require('mongoose')
const Uri = "mongodb+srv://achuthkumartelugu123:WmnpWSUhcx4PcNC6@cluster0.z2hfbyd.mongodb.net/project-1?retryWrites=true&w=majority"
const mongooseConnect = async () => {
    try {
        await mongoose.connect(Uri)
        const db = mongoose.connection
        db.once('open', async () => {
            console.log('database connected')
        })
        try {
            const fetched_data = await db.collection("food_items").find({})
            const fetched_category=await db.collection("foodCategory").find({})
            //selecting collection from db
            const data = await fetched_data.toArray()//to display the data ,we have to toArray()
            const category=await fetched_category.toArray()
            // console.log(data)
            global.food_items=data
            global.foodCategory=category
            // console.log(global.food_items)
        } catch (error) {
            console.log(error)
        }

        db.on('error', (error) => {
            console.log(error)
        })
    } catch (err) {
        console.log(err)
    }

}
module.exports = mongooseConnect
