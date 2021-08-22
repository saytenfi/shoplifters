# shoplifters

/*******************************************
* JScript-330B : Final Project
*
* Alex Palmieri, Morgan Corbridge,
* Julio Payano, Samuel Aytenfisu
*
* August 8th, 2021
* > Updated August 22, 2021
*******************************************/

# Final Project

ECommerce application.

## Overview

This project consists of an ecommerce site allowing users to "purchase" products from a set of provided items controlled by an administrator.  Using this application provides an access point to shoppers who would otherwise
have to shop directly from the brick-and-mortar store.

### Usage

1. Users will Signup for an account
2. After signing up the users will be able to log into their account and view the provided list of products, account details (editable??), and past orders
3. The user will be able to add selected items to their cart
4. Once items are in the users cart the quantity can be updated or be removed altogether, and move to a "Checkout" process

### Planned Routes

1. Account Creation (POST)
2. User Login (POST)
3. Forgot Password? (POST)
4. Create Products* (POST)
5. Update Products* (PUT)
6. Delete Products* (DELETE)
7. Search Products (GET)
8. Filter Products (GET)
9. "Checkout" --> Create Order (POST)
10. "Cancel Order" --> Remove Order (DELETE)
11. "Update Order" --> Update Items (PUT)
12. "My Orders" --> Retrieve User Orders (GET)

* Admin function only

### Timeline

Start: August 8th, 2021
3 - One Week Sprints
Sprint 1: August 9th - August 15th
Sprint 2: August 16th - August 22nd
Sprint 3: August 23rd - August 29th

### Update - 20210822
Deployed to heroku app can be accessed through:
> https://fierce-headland-03799.herokuapp.com/

Signup and Login routes and front-end work as designed.

Products will be loaded directly into database.
When products page is accessed, products will be read from the DB and displayed onto the screen.
Need, to build:
> Product Search ... pending review & merge
> Product Delete ... build in-progress
> Product Create
> Order Update
> Product Filter
> Order Update
> Checkout
> Order DELETE ... pending review & merge
> My Orders

### Idea Backlog

1. Allow users to create "stores" of their own to sell products of their choosing
2. Product Review/Comments/Ratings
3. "People who bought this product also bought"
4. Delivery Estimates API/Shipping Feature


