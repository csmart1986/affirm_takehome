# Node.js Specific Instructions


## Setting up your Development Environment
```
npm i
npm start
```

You'll require `node` (tested on v15.6.0) and `npm` (v7.6.3). We recommend [nvm](https://github.com/nvm-sh/nvm) for node version management, and setup takes just a few minutes. 

We also recommend a desktop client for making local test requests. [Postman](https://www.postman.com/downloads/) is optional, and we have a [Postman collection with an example POST](https://documenter.getpostman.com/view/13975560/TzCV2PK6). At the top you can change the language from curl (which you can run in your terminal) to javascript.

You will **NOT** need to be familiar with OpenAPI or Swagger. Implementing an API contract for endpoint definition is not in the scope of the JS problem.

The code base uses Express to handle a very lightweight frontend at http://localhost:3000/. Updating the frontend is also not in the scope of the problem.

## API 

You will be working on creating a new endpoint, `POST /api/merchant_config/`. 

An example loan application endpoint has been set up: `POST /api/loan_application/`.

### POST /api/loan_application

The only Merchant seeded has `merchant_id = 1`. You will need the merchant_id to hit the "Init Loan Application" endpoint:
```
Headers {
    Content-Type: application/json
    Content-Length: 64
    Connection: keep-alive
    Keep-Alive: timeout=5
}

Body {
    "data": {
        "requested_amount_cents": 10000,
        "currency": "USD",
        "merchant_id": 1
    }
}
```

Using CURL:

```
curl --location --request POST 'http://localhost:3000/api/loan_application' \
--header 'Content-Type: application/json' \
--data-raw '{
    "data": {
        "requested_amount_cents": 10000,
        "currency": "USD",
        "merchant_id": 1
    }
}
'
```

Reference for other languages: [Postman](https://documenter.getpostman.com/view/13975560/TzCV2PK6)