# Project Title: Merchant Product Management System #

This is a Node.js application that uses MongoDB Atlas for data storage. 
The application is designed to manage a list of products for a merchant, 
allowing customers to search for products, place orders, and view their order 
history. It also provides an admin interface for managing products 
and customer orders.

## VIDEO RECORDINGS ##  
 
Project Backend Walkthrough
https://reccloud.com/u/9ae8wcf

Functionality Demo
https://reccloud.com/u/n9809wx

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

The main point of entry for the application is ```server.js```. 

Once started, the application can be accessed at http://localhost:3000.

On first starting you will be greeted with a login screnn.

To try the functionality of a customer,  login with one 
of the customer accounts listed below, or register as a new customer.

To try the functionality of an admin,  login with the user name "admin" 
and password "12345".

## PERSISTENCE ##
This application uses MongoDB, a NoSQL database, for data persistence. 
The Mongoose library is used to interact with MongoDB. The application defines 
several schemas and models to represent the different types of data it needs 
to store.

### Database Connection ###
The application connects to MongoDB using the Mongoose library. The connection 
details are stored in a separate credentials.js module and used to construct 
the MongoDB connection URL. Once the connection is established, any errors 
are logged and the application exits if the connection fails.

### Bike Schema and Model ###
The bikeSchema defines the structure of a bike document in MongoDB. Each bike 
has a name, description, price, stock quantity, and an image URL. The Bikes 
model is created from this schema and exported for use in other parts of the 
application.

### User Schema and Model ###
The userSchema defines the structure of a user document in MongoDB. Each user 
has a first name, last name, username, password, and role. The User model is 
created from this schema and exported for use in other parts of the application.

### Order Schema and Model ###
The orderSchema defines the structure of an order document in MongoDB. Each 
order contains an array of items, a reference to the customer who placed the 
order, and a timestamp for when the order was created. Each item in the order 
has a product ID, quantity, and price. The Orders model is created from this 
schema and exported for use in other parts of the application.

These models are used throughout the application to interact with the MongoDB 
database. They provide a way to create, read, update, and delete documents in 
their respective collections.

## ROUTING ##
This application uses Express.js, a web application framework for Node.js, 
for routing. The application defines several routers to manage different parts 
of the application.

### Main Router ###
The main router is responsible for handling the root route, login, 
registration, and 404 and 500 error pages. It also mounts the customer, admin, 
and REST API routers on their respective paths.

The root route (/) redirects to the login page.  
The login and register routes render their respective views and handle form submissions.  
The customer and admin routes delegate to their respective routers.  
The REST API routes delegate to the REST router.  
Any requests that don't match a route are handled by the 404 error handler.  
Any errors that occur during request handling are passed to the 500 error handler.  

### Customer Router ###
The customer router handles routes related to the customer's interaction with 
the store.

The root route (/) renders the customer console view.  
The products route displays the products available for purchase.  
The add-to-order route handles adding a product to the customer's current order.  
The order-summary route displays a summary of the customer's current order.  
The submit-order route handles the submission of the customer's current order.  
The orders-view route displays the customer's past orders.  

### Admin Router ###
The admin router handles routes related to the admin's management of the store.

The root route (/) renders the admin console view.
The update-inventory route displays the current inventory and allows the admin 
to update product details.  
The add-bike routes render a form for adding a new bike and handle form 
submissions.  
The delete-product route handles the deletion of a product.  
The review-customers route displays a list of all customers.  
The review-orders route displays a list of all orders for a specific customer.  
The update-order routes display a form for updating an order and handle 
form submissions.  
The delete-order route handles the deletion of an order.  

### REST Router ###
The REST router handles routes for the RESTful API.

The root route (/) returns a list of all products.  
The /:id route returns the details of a specific product.  
These routers work together to manage all the routes for the application, 
providing a clear separation of concerns and making the code easier to maintain.  

## REST API ##
The application provides a RESTful API that allows clients to retrieve 
information about bikes in the shop. The API supports both JSON and XML formats.

### Catalog Endpoint ###
The catalog endpoint (/rest) returns a list of all bikes in the shop.

If the lowerPrice and upperPrice query parameters are present, the endpoint 
filters the bikes to only include those within the specified price range.  
If the Accept header is application/json, the endpoint returns the bikes in 
JSON format.  
If the Accept header is application/xml, the endpoint returns the bikes in 
XML format.  
If the Accept header is not application/json or application/xml, the endpoint 
returns a 406 Not Acceptable response.  

### Bike ID Endpoint ###
The bike ID endpoint (/rest/:id) returns the details of a specific bike.

The :id parameter in the URL is used to find the bike in the database.
If the Accept header is application/json, the endpoint returns the bike details 
in JSON format.  
If the Accept header is application/xml, the endpoint returns the bike details 
in XML format.  
If the Accept header is not application/json or application/xml, the endpoint 
returns a 406 Not Acceptable response.  
These endpoints use the Bike model to interact with the MongoDB database and 
the xmlbuilder library to generate XML. They provide a way for clients to 
retrieve bike information without needing to understand the underlying 
database structure.  

## USERS ##

The application supports two types of users: customers and admins.

**Pre-registered Users**  
There are three pre-registered customers:

Jorge Rodriguez, username: JCoco, password: 12345  
Cathy Gavile, username: CG14, password: 12345  
Rebecca Rodriguez, username: RebRod06, password: 12345  

One pre-registered admin:
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
accept type. Not setting accept type will result in a ```406 error``` message.

