// Import necessary libraries
const Web3 = require('web3');
const axios = require('axios');

// Initialize Web3 with an Ethereum node URL
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// Address of the wallet to watch
const walletAddress = '0xYourWalletAddress';

// Define the assets you want to watch
const assetsToWatch = [
  {
    symbol: 'ETH',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18,
  },
  {
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6,
  },
  // Add more assets as needed
];

// Function to fetch asset balance
async function getAssetBalance(asset) {
  const balance = await web3.eth.getBalance(walletAddress);
  return web3.utils.fromWei(balance, 'ether');
}

// Function to fetch token balance
async function getTokenBalance(asset) {
  const tokenContract = new web3.eth.Contract(
    [
      // ERC-20 ABI
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
      },
    ],
    asset.address
  );

  const balance = await tokenContract.methods.balanceOf(walletAddress).call();
  return (balance / 10 ** asset.decimals).toFixed(4);
}

// Function to fetch asset prices
async function getAssetPrices() {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd'
    );
    return {
      ETH: response.data.ethereum.usd,
      USDC: response.data['usd-coin'].usd,
    };
  } catch (error) {
    console.error('Error fetching asset prices:', error.message);
    return {};
  }
}

// Function to update and display wallet asset information
async function updateWalletAssets() {
  const assetPrices = await getAssetPrices();
  console.log('Asset Prices:', assetPrices);

  for (const asset of assetsToWatch) {
    let balance;
    if (asset.symbol === 'ETH') {
      balance = await getAssetBalance(asset);
    } else {
      balance = await getTokenBalance(asset);
    }

    const assetValue = (balance * assetPrices[asset.symbol]).toFixed(2);
    console.log(
      `Asset: ${asset.symbol}, Balance: ${balance} ${asset.symbol}, Value: $${assetValue}`
    );
  }
}

// Call the update function every 10 seconds
setInterval(updateWalletAssets, 10000);
