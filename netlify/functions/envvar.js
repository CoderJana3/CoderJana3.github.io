
exports.handler = async function (event, context){
    const testkey = process.env.API_KEY_TEST;

    return {
        statusCode: 200,
        body: JSON.stringify({testkey})
    }
}