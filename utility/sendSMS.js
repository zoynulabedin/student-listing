// require axios for bulksmsbd
const axios = require('axios');

const bulkSMS = async (tonumber,message) => {                               
 await axios.get(
	`https://bulksmsbd.net/api/smsapi?api_key=jvuW0rlsBjimSqUUghN7&type=text&number=${tonumber}&senderid=8809612443877&message=${message}`
);     
}

module.exports =  bulkSMS;
