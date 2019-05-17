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
    displayInfo();

});

//define function displayInfo to display all products info for customers
function displayInfo() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Product Information For Customer\n");
        for (var i = 0; i < res.length; i++)
            console.log(
                "Item ID: " +
                res[i].item_id +
                "|| Product Name: " +
                res[i].product_name +
                "|| Department Name: " +
                res[i].department_name +
                "|| Price: " +
                res[i].price +
                "|| Stock Quantity: " +
                res[i].stock_quantity
            );
        runInquirerCustomer();
    });
}


//define function runInquirerCustomer to let customers choose an action
function runInquirerCustomer() {
    console.log("================================");
    inquirer
        .prompt({
            name: "customerAction",
            type: "list",
            message: "What you would you like to do?",
            choices: ["I would like to purchase an item.", "Exit"]

        })
        .then(function (choice) {
            switch (choice.customerAction) {
                case "I would like to purchase an item.":
                    item_idSearch();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })
}


//define function item_idSearch to let customers input item id that they went to purchase
function item_idSearch() {
    inquirer
        .prompt({
            name: "item_id",
            type: "input",
            message: "What item id you would like to purchase?"
        })
        .then(function (answer) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.item_id }, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log("Item ID: " +
                        res[i].item_id +
                        "|| Product Name: " +
                        res[i].product_name +
                        "|| Department Name: " +
                        res[i].department_name +
                        "|| Price: " +
                        res[i].price +
                        "|| Stock Quantity: " +
                        res[i].stock_quantity
                    )
                }
                purchase_unitSearch(res[0]);
            })
        })

}


//define function purchase_unitSearch to let customers to decide the units of products they want to purchase
function purchase_unitSearch(result) {
    inquirer
        .prompt({
            name: "purchase_unit",
            type: "input",
            message: "How many units of the product would you like to purchase?"
        })
        .then(function (input) {
            console.log("\nI would like to buy " + input.purchase_unit);
            stock_quantityCheck(result, input);
        })
}


//define function stock_quantityCheck to check again stock quantity, thus to decide whether the quantity is insufficient for customers to purchase
function stock_quantityCheck(result, input) {
    //console.log(input.purchase_unit);
    //console.log(result.stock_quantity);
    if (input.purchase_unit > result.stock_quantity) {
        console.log("\nInsufficient quantity for item id: " + result.item_id)
    } else { order_place(result, input); }

}

//define function order_place to let customers to place order and calculate the total price for the products that the customer purchased

function order_place(result, input) {
    var newQuanity = result.stock_quantity - input.purchase_unit;
    var totalPrice = input.purchase_unit * result.price;
    var totalPriceRound = Math.round(totalPrice * 100) / 100
    var newProductsSales = result.products_sales + totalPriceRound;


    var query = "UPDATE products SET stock_quantity=?, products_sales = ? WHERE item_id =?";
    connection.query(query, [newQuanity, newProductsSales, result.item_id], function (err, res) {
        if (err) throw err;
        console.log("The total price for the product with item id " + result.item_id + " is " + totalPriceRound);
        runInquirerCustomer();
    });
}




