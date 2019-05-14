DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DOUBLE NOT NULL,
    stock_quantity INT NOT NULL

);

USE bamazon;
INSERT INTO products
VALUES (001, "kindle", "electronics", 159.99, 50);


DELETE FROM products WHERE product_name = "kindle";

INSERT INTO products
VALUES (001, "kindle_paperwhite", "electronics", 159.99, 50),
(002, "echo", "electornics", 99.99, 35),
(003, "beats_solo3", "electronics", 224.95, 40),
(004, "kahuna_massagechair_sm7300s", "beauty&health", 2899.99, 56),
(005, "vimerson_turmeric&ginger", "beauty&health", 20.87, 100),
(006, "ernolaszlo_hydraGelCream", "beauty&health", 126, 80),
(007, "omiebox_bentoLunchBox", "home&kitchen", 39.50, 65),
(008, "smeg_toaster", "home&kitchen", 159.95, 60),
(009, "breville_muliFunctionCooker", "home&kitchen", 236.95, 92),
(010, "babybjorn_stepStool", "baby", 19.99, 200);

