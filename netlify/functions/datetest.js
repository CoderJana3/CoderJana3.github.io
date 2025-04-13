const { env } = require('node:process');
exports.handler = async function (event, context) {
    const eventbody = JSON.parse(event.body);
    const eventdate = eventbody.date
    return{
        statusCode: 200,
        body: JSON.stringify({
            date: eventdate
        })
    }
    
}