# Project Title: Merchant Product Management System #

This is a Node.js application that uses MongoDB Atlas for data storage. 
The application is designed to manage a list of products for a merchant, 
allowing customers to search for products, place orders, and view their order 
history. It also provides an admin interface for managing products 
and customer orders.

## FEATURES ##
Display the full product list  
Search for products by name or description  
Customers can select and order products, specifying the desired quantity  
Order submissions update the available product quantities  
Back orders are not allowed  
Display a list of all previous orders for customers  
Admin interface for adding, updating, or deleting products  
Admin interface displays a list of all customers and their order history  
Admins can update or delete existing customer orders  
Provides REST APIs in both XML and JSON formats for the product list, 
products matching a specific name, and products within a specified price range  

## STARTING APPLICATION ##

The main point of entry for the application is server.js.

Once started the application can be accessed at http://localhost:3000.

Persistence for the application is provided by MongoDB Atlas, which the 
application will connect to automatically on startup.

## USERS ##

The application supports two types of users: customers and admins.

**Pre-registered Users**  
There are three pre-registered customers:

Jorge Rodriguez, username: JCoco, password: 12345
Cathy Gavile, username: CG14, password: 12345
Rebecca Rodriguez, username: RebRod89, password: 12345
And one pre-registered admin:

Jorge Rodriguez, username: admin, password: 12345
New customers can register through the application. However, there is no 
functionality to add an admin through the application.

## USER FUNCTIONALITY ##

Logging in as customer will provide the functionality assigned to customers.  
Logging in as an admin will provide the functionality assigned to admin. 

## REST API ##

REST API functionality can be accessed via http://localhost:3000/rest.

**Note:** To access the REST functionality, the request must indicate either 
```application/json``` or ```application/xml``` in the request header as the 
accept type. Not setting accept type will result in a ```406 error```