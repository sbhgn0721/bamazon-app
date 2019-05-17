# Bamazon App

## The demo video link for this app is:
https://drive.google.com/file/d/1ygJGa1XsBsqVuuuuCY9MtrdKs4_ZReaW/view


## Overview
The bamazon app is an Amazon-like storefront application. The app will take in orders from customers and deplete stock from the store's inventory, rack product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

### bamazonCustomer.js application
1. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

2. Then The app will prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

3. Once the customer has placed the order, the application will check if the store has enough of the product to meet the customer's request.

   * If not, the app will log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

4. However, if the store _does_ have enough of the product, the customer's order will be fullfilled.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

- - -


### bamazonManager.js application
1. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  2. If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

  3. If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  4. If a manager selects `Add to Inventory`, the app should display a prompt that will let the manager "add more" of any item currently in the store.

  5. If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store.

### bamazonSupervisor.js
1. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

2.  When a supervisor selects `View Product Sales by Department`, the app will display a summarized table in their terminal/bash window. The table includes these columns: department_id, department_name, over_head_costs, products_sales, total_profit. 

3. The `total_profit` column is calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` is not stored in any database. 


