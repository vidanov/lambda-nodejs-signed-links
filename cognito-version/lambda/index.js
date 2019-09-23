const AWS = require('aws-sdk');
var cfsign = require('aws-cloudfront-sign');


exports.handler = async function (event, context) {
    try {
    var urn = event["queryStringParameters"]['urn']; }
    catch (e) {
        if (urn === undefined) {
            return {
                statusCode: 403,
                body: 'Access denied' // No file name provided
            };
        }
    }
    // Creating of the key pair used below
    // https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#private-content-creating-cloudfront-key-pairs
    var keypairId = process.env['keypairId'];
    var privateKeyString = process.env['privateKeyString'];
    var config = process.env['privateKeyString'];

    // Try to generate the link!

    try {

        
        var cloudFrontDomain = JSON.parse(config.Parameter.Value).cloudFrontDomain;
        var lt = JSON.parse(config.Parameter.Value).lt; // the default lifetime of the link
        var maxlt = JSON.parse(config.Parameter.Value).maxlt; // maximum lifetime of the link

        if (event["queryStringParameters"]['lt']) {
            lt = event["queryStringParameters"]['lt'];
        }
        if (lt > maxlt ) {
            lt = maxlt;
        }
        console.log(lt);

        var signingParams = {
            keypairId: keypairId.Parameter.Value,
            privateKeyString: privateKeyString.Parameter.Value,
            expireTime: (new Date().getTime()) + lt * 60 * 1000 //  how long is the link valid
        }

        // Generating a signed URL
        var signedUrl = cfsign.getSignedUrl(
            `https://${cloudFrontDomain}/${urn}`,
            signingParams
        );
        console.log(`Successfully generated a signed url ${signedUrl}. Expiry time of the link: ${lt} minutes `);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: signedUrl
        };

    } catch (e) {
        console.log(`Something went wrong. Here is the error by generating of the Signed URL!`);
        console.log(e);
        return {
            statusCode: 403,
            body: 'Access denied' // Something went wrong, we log it.
        };
    }
};