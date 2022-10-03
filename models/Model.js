const { range } = require('lodash');
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

async function main() {
    const client = new MongoClient("mongodb+srv://amaldz:Pa55306d@cluster0.vor7cs3.mongodb.net/?retryWrites=true&w=majority");

    module.exports = class details {

        static async InsertAgency(Body) {
            try {
                await client.connect();
                const AgencyCollection = client.db("zerozilla_clients").collection("agency");

                var data = {
                    name: Body.name,
                    address_1: Body.address_1,
                    address_2: Body.address_2,
                    city: Body.city,
                    state: Body.state,
                    phone_number: Body.phone_number,
                }
                
                const result = await AgencyCollection.insertOne(data);

                return result;

            } catch (e) {
                console.error(e);
                return "error";
            }
        }
        static async InsertClient(Body) {
            try {
                await client.connect();
                const ClientCollection = client.db("zerozilla_clients").collection("clients");

                const AgencyId = new ObjectID(Body.agency_id);

                var data = {
                    agency_id: AgencyId,
                    client_name: Body.client_name,
                    client_email: Body.client_email,
                    client_phone: Body.client_phone,
                    client_total_bill: Number(Body.client_total_bill),
                }
                
                const result = await ClientCollection.insertOne(data);
                return result;

            } catch (e) {
                console.error(e);
                return "error";
            }
        }

        static async UpdateClient(Body) {

            try {
                // Connect to the MongoDB cluster
                await client.connect();
                const ClientCollection = client.db("zerozilla_clients").collection("clients");

                const ClientId = new ObjectID(Body.client_id);


                var filter = { _id: ClientId };
                var updates = { $set: 
                    { 
                        client_name: Body.client_name,
                        client_email: Body.client_email,
                        client_phone: Body.client_phone,
                        client_total_bill: Number(Body.client_total_bill),
                    } 
                };

                const result = await ClientCollection.updateOne(filter, updates)

                return result;

            } catch (e) {
                console.error(e);
                return "error";
            }
        }

        static async GetAgency(Body) {

            try {
                // Connect to the MongoDB cluster
                await client.connect();
                const AgencyCollection = client.db("zerozilla_clients").collection("agency");

                const result = await AgencyCollection.find().toArray();

                return result;

            } catch (e) {
                console.error(e);
                return "error";
            }
        }
        static async GetClients(AgencyId) {

            try {
                // Connect to the MongoDB cluster
                await client.connect();
                const ClientCollection = client.db("zerozilla_clients").collection("clients");

                const AgencyID = new ObjectID(AgencyId);

                const result = await ClientCollection.find({ "agency_id": AgencyID,}).sort({ "client_total_bill": -1 }).toArray();

                return result;

            } catch (e) {
                console.error(e);
                return "error";
            }
        }
    }
}
main().catch(console.error);