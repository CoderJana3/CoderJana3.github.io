
exports.handler = async function (event, context){
    const testkey = process.env.API_KEY_TEST;
    const apikey = process.env.API_KEY;
    const bictoken = process.env.BIC_TOKEN;

    return {
        statusCode: 200,
        body: JSON.stringify({
            testkey: testkey,
            apikey: apikey,
            bictoken: bictoken
        })
    }
}