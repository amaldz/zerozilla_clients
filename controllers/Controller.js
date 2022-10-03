const Model = require('../models/Model');

module.exports.InsertAgency = async(req, res, next) => {

    
    try {
        const Agency = await Model.InsertAgency(req.query)

        if(Agency.insert){
            const Client = await Model.InsertClient(req.query,Agency.insertedId)
            if(Client.insert){
                res.status(200).json(
                    { 
                        "status": true, 
                        "agency_id": Agency.data.insertedId, 
                        "client_id": Client.data.insertedId, 
                        "client": Client.data.ops,
                        "agency": Agency.data.ops
                    }
                    );
            }else {
                res.status(200).json(
                    { 
                        "status": false, 
                        "error": Client.data
                    }
                    );
            }
            
        }else {
            res.status(200).json(
                { 
                    "status": false, 
                    "error": Agency.data
                }
                );
        }

    } catch (e) {
        res.status(200).json({ "status": false, "data": 'Bad request!' });
    }
}

module.exports.InsertClient = async(req, res, next) => {

    try {
        const Client = await Model.InsertClient(req.query)

        if (req.query.agency_id == undefined || req.query.agency_id == ""){
            res.status(200).json(
                { 
                    "status": false, 
                    "error": "Agency Id Should not be empty"
                }
                );
        }else {
            if(Client.insert){
                res.status(200).json(
                    { 
                        "status": true, 
                        "client_id": Client.data.insertedId, 
                        "client": Client.data.ops,
                    }
                    );
            }else {
                res.status(200).json(
                    { 
                        "status": false, 
                        "error": Client.data
                    }
                    );
    
            }
        }
    
    } catch (e) {
        res.status(200).json({ "status": false, "data": 'Bad request!' });
    }
}

module.exports.UpdateAgency = async(req, res, next) => {

    try {
        const Update = await Model.UpdateClient(req.query)

        if(Update.matchedCount == 1){
            res.status(200).json(
                { 
                    "status": true, 
                    "result": "Client Details Updated"
                }
                );        
        }else {
            res.status(200).json(
                { 
                    "status": true, 
                    "result": "Client Details Not Updated"
                }
                );
        }
    

    } catch (e) {
        res.status(200).json({ "status": false, "data": 'Bad request!' });
    }
}
module.exports.GetAgency = async(req, res, next) => {

    try {
        const AgencyData = await Model.GetAgency(req.query)

        for (let index = 0; index < AgencyData.length; index++) {
            
            const ClientData = await Model.GetClients(AgencyData[index]._id)
            
            AgencyData[index].clients = ClientData

        }
        res.status(200).json(
        { 
            "status": true, 
            "data": AgencyData, 
        }
        );

    } catch (e) {
        res.status(200).json({ "status": false, "data": 'Bad request!' });
    }
}