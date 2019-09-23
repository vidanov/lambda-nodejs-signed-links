
# Signed Urls for CloudFront <-> S3 with API

We create here the Api Gateway with Cognito Authentication to create secure time limited links (signed urls) for CloudFront resources. The API gateway send requests to a Lambda function. The Lambda uses the CloudFront private key to create the signed urls. 

- https://:::APIGATEWAY::::.execute-api.eu-central-1.amazonaws.com/Prod/signed_link?urn=your_video.mp4&lt=180
  *urn* is required
  *lt* is optional (10 minutes is set by default configured as maximumLifeTime defaultLifeTime, maximum is 600 minutes, configured as maximumLifeTime in your function)

### Creating a CloudFormation key pair

1. Create a CloudFront key pair using the root account (described in this doc):
  https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#private-content-creating-cloudfront-key-pairs
You will need the keypairId and the private key to create the secured links.

### Set up your CloudFront and S3 Bucket

- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#private-content-creating-oai
- The shorter version https://medium.com/roam-and-wander/using-cloudfront-signed-urls-to-serve-private-s3-content-e7c63ee271db

### Lambda

- It is completely parameterized using environment variables.
- You can change the parameters any time directly in the lambda function.

###  Links

- Configuring CloudFront
https://medium.com/roam-and-wander/using-cloudfront-signed-urls-to-serve-private-s3-content-e7c63ee271db
  
- Signed URLs with Node JS

  https://aws.amazon.com/de/blogs/developer/creating-amazon-cloudfront-signed-urls-in-node-js/

- Restricting access to S3 

  https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html

- AWS Signed URL and Cookies
  https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html
