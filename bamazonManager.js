var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "XHLkwj610:)",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    runInquirerManagement();

});

//ask the manager's action, and run corresponding function
function runInquirerManagement() {
    inquirer
        .prompt({
            name: "managerAction",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"]
        })
        .then(function (answer) {
            switch (answer.managerAction) {
                case "View Products for Sale":
                    displayProductsForSale();
                    break;

                case "View Low Inventory":
                    displayLowInventory();
                    break;

                case "Add to Inventory":
                    addMoreProducts();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "exit":
                    connection.end();
                    break;

            }
        });
}

//define function displayProductsForSale
function displayProductsForSale() {

    var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item ID: " +
                res[i].item_id +
                " || Product Name: " +
                res[i].product_name +
                " || Price: " +
                res[i].price +
                " || Stock Quantity: " +
                res[i].stock_quantity
            )
        };
        runInquirerManagement();
    })
}

//define function displayLowInventory to display all items with an inventory count lower than five
function displayLowInventory() {

    var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0 && stock_quantity < 5";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Products with an inventory count lower than five: ")
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item ID: " +
                res[i].item_id +
                " || Product Name: " +
                res[i].product_name +
                " || Price: " +
                res[i].price +
                " || Stock Quantity: " +
                res[i].stock_quantity
            )
        };
        runInquirerManagement();
    })
}

//define funtion addMoreProducts to allow manager to add more units of an item currently in the store
function addMoreProducts() {
    inquirer
        .prompt([
            {
                name: "addQuantity_itemID",
                type: "input",
                message: "What item id you would like to add more quantity?"
            },
            {
                name: "addQuantity_units",
                type: "input",
                message: "How many units you would like to add?"
            }
        ])
        .then(function (answer) {

            var query1 = "UPDATE products SET stock_quantity =stock_quantity + ? WHERE item_id =?";
            connection.query(query1, [answer.addQuantity_units, answer.addQuantity_itemID], function (err, res) {
                if (err) throw err;
                console.log("The updated product information for the item:");

                var query2 = "SELECT * FROM products WHERE item_id = ?";
                connection.query(query2, [answer.addQuantity_itemID], function (err, res) {
                    console.log(
                        "Item ID: " +
                        res[0].item_id +
                        " || Product Name: " +
                        res[0].product_name +
                        " || Price: " +
                        res[0].price +
                        " || Stock Quantity: " +
                        res[0].stock_quantity

                    )
                    runInquirerManagement();
                })
            })

        })
}

//define function addNewProduct to allow manager to add a completely new product to the products table
function addNewProduct() {
    inquirer
        .prompt([

            {
                name: "newProduct_Name",
                type: "input",
                message: "What product name you would like to add to the store?"
            },
            {
                name: "departmentName",
                type: "list",
                message: "Which department you would like to choose for the new product?",
                choices: ["electronics", "beauty&health", "home&kitchen", "baby", "add new"],

            },
            {
                name: "departmentName",
                type: "input",
                message: "Please input new department name?",
                when: function (answer) {
                    return answer.departmentName === "add new";
                }
            },
            {
                name: "newPrice",
                type: "input",
                message: "What is the price of the product you would like to add to the store?"
            },
            {
                name: "newStock_Quantity",
                type: "input",
                message: "How many units of the product you would like to add to the store?"
            }
        ])
        .then(function (answer) {
            addNewHelper(answer);
        })
}

function addNewHelper(answer) {
    var query1 = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)";
    connection.query(query1, [answer.newProduct_Name, answer.departmentName, answer.newPrice, answer.newStock_Quantity], function (err) {
        if (err) throw err;

        var query2 = "SELECT * FROM products WHERE product_name =?";
        connection.query(query2, [answer.newProduct_Name], function (err, res) {
            console.log("The new product information:");
            console.log(
                "Item ID: " +
                res[0].item_id +
                "|| Product Name: " +
                res[0].product_name +
                "|| Department Name: " +
                res[0].department_name +
                "|| Price: " +
                res[0].price +
                "|| Stock Quantity: " +
                res[0].stock_quantity

            )
            runInquirerManagement();
        })
    })

}
