CREATE TABLE order_details(id SERIAL PRIMARY KEY, product_id BIGINT REFERENCES Products(id), order_id BIGINT REFERENCES orders(id), quantity numeric, created_at DATE);