# Lambda Save Paramas

# API Gateway

- create API Gateway.
- create POST Resource.

# Lambda

open index.js and set 's3Bucket'.

```
$ zip -r lambda_save_params.zip *
```

Create AWS lambda and upload lambda_save_params.zip.

'API endpoint' tab -> 'API Gateway'

API Name: YOUR_API_NAME
Resource name: YOUR_API_RESOURCE
Method: POST
Deployment stage: prod
Security: Open

# Test 

```
$ curl -H "Content-Type: application/json" -X POST -d '{}' https://YOUR.API.ENDPOINT/RESOURCE
```
