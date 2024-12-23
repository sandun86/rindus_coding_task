
 
### Rindus NodeJs Test (Nodejs v23.5.0, Npm v10.9.2)
----------

Install steps
    
    1.Clone the code base
    2.npm install
    3.Make a copy of sample.env file as a .env (`cp sample.env .env`)
    4.Make sure all the variables are created in .env
    5.Create a Mysql database called `rindus` and run `db.sql` to create the table
    6.Run `npm run dev` (service will be run on given port which in .env, example : http://localhost:3002)
    7.Use the API documentation to check the APIs and called as well (http://localhost:3002/api-docs)

----------  
[Swagger API Documentation](http://localhost:3002/api-docs)
## NPM scripts

- `npm run build` - build application
- `npm start`     - run application
- `npm run test`  - run Jest test 

----------


## Create a user - run this curl command

curl -X 'POST' \
  'http://localhost:3002/users' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Alex Smith",
  "email": "alex1@rindus.com",
  "age": 12
}'

## Fetch a user - run this curl command

curl -X 'GET' \
  'http://localhost:3002/users/1' \
  -H 'accept: */*'