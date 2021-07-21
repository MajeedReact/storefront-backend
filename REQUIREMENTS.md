# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- [x] Index `/prodcuts` METHOD: get
- [x] Show `/products/:id` METHOD: get
- [x] Create [token required] `/products` METHOD: post
- [ ] [OPTIONAL] Top 5 most popular products
- [x] [OPTIONAL] Products by category (args: product category) `/products/categories/${nameOfCategory}` METHOD: get
- [x] [Extra] Delete a product (args: order_id) [token required] `/products` METHOD: delete

#### Users

- [x] Index [token required] `/users` METHOD: get
- [x] Show [token required] `/users/id` METHOD: get
- [x] Create [token required] `/users` METHOD: post
- [x] [Extra] Delete user [token required] `/users` METHOD: delete

#### Orders

- [x] Current Order by user (args: user id)[token required] `/orders` METHOD: get. **_Note it will only display orders that are active_**
- [x] [OPTIONAL] Completed Orders by user (args: user id)[token required] `/orders/complete` METHOD: get
- [x] [Extra] Change order status `/orders/:id` METHOD: put
- [x] Create order details `/orders/:id/details` METHOD: post
- [x] [Extra] Update order (args: user_id, order_id) `/orders/:id` METHOD: put

## Data Shapes

#### Product

- [x] id: SERIAL PRIMARY KEY
- [x] name: VARCHAR
- [x] price: numeric
- [x] [OPTIONAL] category: VARCHAR

Schema for product
`CREATE TABLE Products(id SERIAL PRIMARY KEY, name VARCHAR (50), price numeric, category VARCHAR);`

#### Users

- [x] id: SERIAL PRIMARY KEY
- [x] firstName: VARCHAR
- [x] lastName: VARCHAR
- [x] email: VARCHAR
- [x] user_pass: VARCHAR

Schema for users
`CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR, lastname VARCHAR, email VARCHAR, user_pass VARCHAR);`

#### Orders

- [x] order_id: SERIAL PRIMARY KEY
- [x] user_id: BIGINT REFERENCES users(id)
- [x] status of order (active or complete): VARCHAR

Schema for orders
`CREATE TABLE orders(id SERIAL PRIMARY KEY, users_id BIGINT REFERENCES users(id), status VARCHAR(15));`

#### Order_details

- [x] id: SERIAL PRIMARY KEY
- [x] product_id: BIGINT REFERENCES Products(id)
- [x] order_id: BIGINT REFERENCES order_items(id)
- [x] quantity: int
- [x] created_at: DATE

Schema for order_details
`CREATE TABLE order_details(id SERIAL PRIMARY KEY, product_id BIGINT REFERENCES Products(id), order_id BIGINT REFERENCES orders(id), quantity numeric, created_at DATE);`
