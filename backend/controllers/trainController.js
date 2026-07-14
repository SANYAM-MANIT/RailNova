const Train = require("../models/Train");

const searchTrains = async (req,res)=>{

    try{

        const {from,to}=req.query;

        const trains=await Train.find({

            from:new RegExp("^"+from+"$","i"),

            to:new RegExp("^"+to+"$","i")

        });

        res.status(200).json(trains);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server Error"

        });

    }

};

module.exports={

    searchTrains

};