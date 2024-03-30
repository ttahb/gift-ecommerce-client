# PIRINEOS GOURMET

[See it live](https://pirineosgourmet.netlify.app/).
----

# Introduction

Welcome to *Pirineos Gourmet* – Your Premier Destination for Exquisite Corporate Gifts! At Pirineos Gourmet, we understand the significance of expressing gratitude to your employees, especially during the festive season. Our meticulously curated selection of wine, cheese, jams, and gourmet delights offers an unparalleled opportunity to convey your appreciation in the most delightful and memorable manner.

## Programmer's Persepective

This project serves as the frontend to our fullstack web application. The backend for this project can be found [here](https://github.com/ttahb/gift-ecommerce-server).

## How to install and deploy?

Go to the folder you want to clone the project. This project was created using [vite](https://vitejs.dev/guide/)
```
git clone https://github.com/ttahb/gift-ecommerce-client.git
cd gift-ecommerce-client
npm install
npm run dev

```
After you do the above steps, you should be able to check the site at  localhost:5173 ( default port for projects created using vite)
## Don't forget to setup environment variables before npm run dev

You will need to create a .env file at root location of the project to setup all properties: - 
```
VITE_SERVER_URL='http://localhost:5005'
VITE_STRIPE_PUBLISHABLE_API_KEY='stripe_publishable_key'
```
http://localhost:5005 points to the backend server. Please follow the readme for backend  [here](https://github.com/ttahb/gift-ecommerce-server).
Also, please follow stripe documentation to create developer test account and get your private and publishable secret key. [Stripe](https://stripe.com/in/resources/more/how-to-integrate-a-payment-gateway-into-a-website). Private key will be used when you are setting up the backend, please read backend readme for that purpose.



