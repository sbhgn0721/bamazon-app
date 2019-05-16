var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "XHLkwj610:)",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    runInquirerSupervisor();

});

//ask the supervisor's action, and run corresponding function
function runInquirerSupervisor() {
    inquirer
        .prompt({
            name: "supervisorAction",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products Sales by Department",
                "Create New Department",
                "Exit"]
        })
        .then(function (answer) {
            switch (answer.supervisorAction) {
                case "View Products Sales by Department":
                    displayProductsSale_Department();
                    break;

                case "Create New Department":
                    createNewDepartment();
                    break;

                case "exit":
                    connection.end();
                    break;

            }
        });
}

//define the function displayProductsSale_Department to allow supervisor to view product_sales, total_profit by department
function displayProductsSale_Department() {
    var query = "SELECT SUM(products.products_sales) as products_sales, departments.department_id, departments.department_name, departments.over_head_costs FROM products Inner JOIN departments ON products.department_name = departments.department_name Group by departments.department_id";
    connection.query(query, function (err, res) {
        if (err) throw err;

        //Use cli table package to display the outcome data for supervisor to view
        var table = new Table({
            head: ['depaertment_id', 'department_name', 'over_head_costs', 'products_sales', 'total_profit'],
            colWidths: [20, 20, 20, 20, 20]
        });
        for (var i = 0; i < res.length; i++) {
            var totalProfit = (res[i].products_sales - res[i].over_head_costs).toFixed(2);
            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].products_sales.toFixed(2), totalProfit]
            );
        }

        console.log(table.toString());

    })

}

//define function createNewDepartment to allow supervisor to create new department in the departments table
function createNewDepartment() {
    inquirer
        .prompt([{
            name: "newDepartmentName",
            type: "input",
            message: "Please input new department name:"

        },
        {
            name: "newDepartmentOverheadCosts",
            type: "input",
            message: "Please input the overhead costs for the new department:"
        }
        ])
        .then(function (answer) {

            var query1 = "INSERT INTO departments (department_name, over_head_costs) VALUES (?,?)";
            connection.query(query1, [answer.newDepartmentName, answer.newDepartmentOverheadCosts], function (err) {
                if (err) throw err;

                var query2 = "SELECT * FROM departments WHERE department_name = ?";
                connection.query(query2, [answer.newDepartmentName], function(err,res){
                for (var i =0; i < res.length; i++) {
                    console.log(
                        "Department ID: " +
                        res[i].department_id +
                        "|| Department Name: " +
                        res[i].department_name +
                        "|| Overhead Costs: " +
                        res[i].over_head_costs 
                    );
                }
                runInquirerSupervisor();
                })

            })
        })
}

