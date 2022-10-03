const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

// const app = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(morgan('dev'));

//********************************************** */

const ClientController = require('../controllers/Controller')

/** Routes start here */


/** Batch */
router.post('/insert-agency', ClientController.InsertAgency)
router.post('/insert-client', ClientController.InsertClient)
router.post('/update-agency', ClientController.UpdateAgency)
router.post('/get-agency_clients', ClientController.GetAgency)


/** Routes exported */
module.exports = router;