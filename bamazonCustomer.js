var mysql = require("mysql");
var inquirer = require("inquirer");

var connection  = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "XHLkwj610:)",
    database: "bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    displayInfo();

});

//define function displayInfo to display all products info for customers
function displayInfo() {
    var query = "SELECT * FROM products";

    connection.query(query, function(err,res){
        if(err) throw err;
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
    });

}