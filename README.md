# shoplifters

/*******************************************
* JScript-330B : Final Project
*
* Alex Palmieri, Morgan Corbridge,
* Julio Payano, Samuel Aytenfisu
*
* August 8th, 2021
* > Updated August 22, 2021
* > Updated September 4, 2021
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
> Checkout
> Order DELETE ... pending review & merge
> My Orders

## Self Evaluation/Retrospective
### Approach
The initial approach was to be able to share the developement for each "Route" so, for example, a developer would work on our "Product Create" and "Order Update" routes and another developer would work on "Product Update" and "User Create" routes.  This, however, created several conflicts when attempting to merge changes as the developers were each touching the same files, so we spent a lot of time going to file conflict resolution, which impeded our progress.  After, the first sprint the plan was adjusted so one developer would be online sharing the screen content while the others contributed vocally to what needed to be added/updated.  This created it's own issues as schedule conflicts meant there were a few days where no progress was made.  Using trello, we attempted to breakdown and organize the tasks, which led to further confusion and misunderstanding on what was being actively worked and what was in testing or under review.  Daily standups were held and went beyond the agile recommendation of max 15 minutes due to the volume of work still needed to work.

To improve on the aforementioned approach, it would be better to have a developer working on a single routes CRUD actions.  So, 1 developer would work on "Product CRUD" and a separate developer work on the "Order CRUD" and so on.  This would alleviate, not all, but the majority of file conflicts that arose during our development cycles.  Since there were four developers on the team, it would be beneficial to have either a fourth set of CRUD routes or to have that developer work on creating test cases for the other developers.

Once a plan was in place of how to maintain progress, the team was able to successfully implement the necessary additions and changes to ensure the routes were working as designed.  Working as a team, the front-end was put together to ensure a proper flow and UI for the designated user functionality, including an admin page.

In order to validate the admin functionality, you will need to create yourself as an admin, send the following request through postman as a post request:

{
    "email": [desired email],
    "password": [desired pwd],
    "confirmPassword": [same pwd],
    "firstName": [desired first name],
    "lastName": [desired last name],
    "role": "admin"
}

## Lessons Learned
During the developement it was learned that when using the Mustache HTML method, only POST and GET are supported to be able to send from the front-end application to the api routes.  This created some confusion at first as the body of our redirects was empty, which would break the route.  Through searching it was determined that the HTTP status code 307 for POST requests would retain the request body allowing the route to process as expected.  This led to developing POST requests for our "DELETE" and "UPDATE" functionality so that the api can perform the requested action; the path's were added "../delete" or "../create" or "../update" and within the route.

Other chanllenges included deploying the app to heroku, specifically due to bcrypt failing to install.  After an extensive search and logging, it was determined that we can exclude the npm_modules directory from out publish to git as Heroku would install based on the package.json file.  Once this was determined the app was successfully built and deployed to Heroku.


