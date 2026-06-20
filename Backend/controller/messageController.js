const messageModel =require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        if (!from || !to || !message) {
            return res.status(400).json({ msg: "Missing fields in request body" });
        }

        const data = await messageModel.create({
            message: { text: message },
            users: [from, to], // Assuming you meant to use an array here
            sender: from,
        });

        if (data) {
            return res.status(201).json({ msg: "Message added successfully", data });
        } else {
            return res.status(500).json({ msg: "Failed to add message to the database" });
        }
    } catch (error) {
        
        next(error);
    }
};


module.exports.getAllMessage = async (req, res, next) => {
    try{
        const {from,to}= req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from,to],
            },
        }).sort({updatedAt: 1});
        const projectMessages =messages.map((msg)=>{
            return {
                fromSelf: msg.sender.toString()===from,
                message: msg.message.text,

            };
        });
        res.json(projectMessages);

    }catch(ex){
        next(ex);
    }
};