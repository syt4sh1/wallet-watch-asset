# wallet-watch-asset

This repository contains an advanced wallet asset watcher application written in JavaScript. The application allows you to monitor the balances and values of various assets in a specified wallet address.

## Features

- Monitors Ethereum and ERC-20 token balances in a given wallet address.
- Fetches real-time asset prices using the CoinGecko API.
- Updates and displays asset balances and values periodically.
- Easily customizable to add more assets and functionalities.

## Prerequisites

- Node.js and npm installed on your machine.
- An Ethereum wallet address that you want to monitor.
- Infura project ID to connect to the Ethereum network.

## Installation

1. Clone the repository:
```git clone https://github.com/your-username/advanced-wallet-watcher.git```
2. Navigate to the project directory:
```cd advanced-wallet-watcher```
3. Install the required dependencies:
```npm install web3 axios``` 

## Configuration
- Replace ```YOUR_INFURA_PROJECT_ID``` in main.js with your actual Infura project ID.
- Modify the walletAddress variable in ```main.js``` to the Ethereum wallet address you want to monitor.
- Customize the assetsToWatch array in ```main.js``` to include the assets you want to monitor.

## Usage
Run the application using the following command:
```node main.js```
The application will periodically update and display the balances and values of the specified assets in the console.
