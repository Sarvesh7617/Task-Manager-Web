const asyncHandler=(func)=>async (req,res,next)=>{
    try{
        await func(req,res,next) 
    }
    catch(error){
        res.status(error.code || 500).json({
            success:false,      //for frontend ke liye easy hota hai
            message:error.message
        })
    }
}


export {asyncHandler};