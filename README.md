# PIRINEOS GOURMET

[See it live](https://pirineosgourmet.netlify.app/).
----

# Introduction

Welcome to *Pirineos Gourmet* – Your Premier Destination for Exquisite Corporate Gifts! At Pirineos Gourmet, we understand the significance of expressing gratitude to your employees, especially during the festive season. Our meticulously curated selection of wine, cheese, jams, and gourmet delights offers an unparalleled opportunity to convey your appreciation in the most delightful and memorable manner.

## Minimum Viable Product

- User registration and login using JWT web based authentication
- Homepage, Products Page, Orders, Profile, About Us, Contact Us (Dummy)
- Order Details Page
- Product Details Page
- Basket Page
- Payment's Page with Stripe Integration
- Payment Success Page

## Role Based Access
- Customer View, Admin View
- A normal customer can shop the products and add them to basket and checkout and skip payment or complete payment. He can also see his order history from profile page.
- An admin is able to create products for listing in the website, as well as delete the product if needed,  and see all user's orders and update the order status.
- We also have user with *moderator* role which is able to update order status and update products.


## Programmer's Persepective

This project serves as the frontend to our fullstack web application. The backend for this project can be found [here](https://github.com/ttahb/gift-ecommerce-server). It is recommended to setup the backend 
before setting up the frontend.

## Tech Stack

React.js, Vite, HTML5, CSS3, JavaScript

## How to install and deploy?

Go to the folder you want to clone the project. This project was created using [vite](https://vitejs.dev/guide/)
```
git clone https://github.com/ttahb/gift-ecommerce-client.git
cd gift-ecommerce-client
npm install

```
## Set Environment Variables

You will need to create a .env file at root location of the project to setup all properties: - 
```
VITE_SERVER_URL='http://localhost:5005'
VITE_STRIPE_PUBLISHABLE_API_KEY='stripe_publishable_key'
```
http://localhost:5005 points to the backend server. Please follow the readme for backend  [here](https://github.com/ttahb/gift-ecommerce-server).
Also, please follow stripe documentation to create developer test account and get your private and publishable secret key. [Stripe](https://stripe.com/in/resources/more/how-to-integrate-a-payment-gateway-into-a-website). Private key will be used when you are setting up the backend, please read backend readme for that purpose.

## Deploy
Once done with creating with .env file, run the app using
```
npm run dev
```
After you do the above steps, you should be able to check the site at  localhost:5173 ( default port for projects created using vite)


## Authors

- [Mayo Socas](https://github.com/Mayo9704)
- [Ivan Pavlov](https://github.com/12Ivan03)
- [Vijay Bhatt](https://github.com/ttahb)


