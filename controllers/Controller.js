const Model = require('../models/Model');

module.exports.InsertAgency = async(req, res, next) => {

    try {
        const Agency = await Model.InsertAgency(req.query)
        const Client = await Model.InsertClient(req.query,Agency.insertedId)

        res.status(200).json(
        { 
            "status": true, 
            "agency_id": Agency.insertedId, 
            "client_id": Client.insertedId, 
            "client": Client.ops,
            "agency": Agency.ops
        }
        );

    } catch (e) {
        res.status(200).json({ "status": false, "data": 'Bad request!' });
    }
}

module.exports.InsertClient = async(req, res, next) => {

    try {
        const Client = await Model.InsertClient(req.query)

        res.status(200).json(
        { 
            "status": true, 
            "agency_id": req.query.agency_id, 
            "client_id": Client.insertedId, 
            "client": Client.ops,
        }
        );

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