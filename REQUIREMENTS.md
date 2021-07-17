# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- [x] Index `/prodcuts` METHOD: get
- [x] Show `/products/:id` METHOD: get
- [x] Create [token required] `/products` METHOD: post
- [] [OPTIONAL] Top 5 most popular products
- [x] [OPTIONAL] Products by category (args: product category) `/products/categories/${nameOfCategory}` METHOD: get

#### Users

- [x] Index [token required] /users METHOD: get
- [x] Show [token required] /users/id METHOD: get
- [x] Create N[token required] /users METHOD: post

#### Orders

- [x] Current Order by user (args: user id)[token required] /orders METHOD: get. **_Note it will only display orders that are active_**
- [x] [OPTIONAL] Completed Orders by user (args: user id)[token required] /orders/complete METHOD: get

## Data Shapes

#### Product

- [x] id: SERIAL PRIMARY KEY
- [x] name: numeric
- [x] [OPTIONAL] category: VARCHAR

#### User

- [x] id: SERIAL PRIMARY KEY
- [x] firstName: VARCHAR
- [x] lastName: VARCHAR
- [x] password: VARCHAR

#### Orders

- [x] id: SERIAL PRIMARY KEY
- [x] id of each product in the order: BIGINT
- [x] quantity of each product in the order: numeric
- [x] user_id: BIGINT
- [x] status of order (active or complete): VARCHAR