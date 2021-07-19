# storefront-backend
This is a storefront backend using Postgresql database, express, node.js, and JWT (jsonwebtoken) as well as bcrypt for hashing the passwords

# Requirements

 - Postgresql database
 - Node and express for the application
 - Enviorment variables
 - db-migrate database migration
 - JWT (jsonwebtoken) for authentication
 - Jasmine for testing
 - supertest to test endpoints
 
# Dependencies

- express
- pg
- nodemon
- ts-node
- typescript
- bcrypt
- dotenv
- jsonwebtoken
- db-migrate
- db-migrate-pg
- jasmine
- jasmine-spec-reporter

# Enviorment variable example

POSTGRES_HOST=127.0.0.1 \
POSTGRES_DB=udacity_dev \
POSTGRES_TEST_DB=udacity_test \
POSTGRES_USER=postgres \
POSTGRES_PASSWORD=postgres123 \
ENV=dev \
BCRYPT_PASSWORD=udacity-fire \
SALT_ROUNDS=10 \
TOKEN_SECRET=udacity-fire 

# Scripts
 ```
    npm run build 
    npm run node ./dist/server.js
    npm run test
    npm run start
```

- Run build to compile Typescript
- run test to start jasmine test
- run start to start server
- run node to start the compiled javascript server