# leap developer portal

This is the open source developer portal for [LeapWallet](https://leapwallet.io). We have built a developer portal to help developers build on top of LeapWallet. This effort will hopefully improve the existing cosmos ecosystem and serve our thousands of users better!

## Development

Follow the steps below to run the developer portal locally -

1. Clone the repo
   ```sh
   git clone
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Run the app
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000/developers](http://localhost:3000/developers) on your favorite browser.

## Contributing

Fork the repo (or if you have write access to the repo create a branch) and make your changes. Once you are done, submit a pull request and we will review your changes.

### Add a Chain

If you are looking to add a new chain to the Chain Store, please follow the steps below:

1. Create an issue with the name "Add Chain Logo - <chain-id>".
2. Upload the logo of the chain in the issue. One of the maintainers will add the logo to leap's assets cdn.
3. Start a PR with the name "Add <chain-id> to Chain Store".
4. Add the chain data to `data/chain-store` folder with the name `<chain-id>.json`. You can use the chain logo from step 2. Data format is given [below](#chain-data-structure).
5. Automated checks will be run on the PR. If the checks pass, the PR will be reviewed by one of the maintainers.
6. Once reviewed and approved, the PR will be merged and the chain will be added to the Chain Store.

### Chain Data Structure

```json
{
  "chainId": "osmosis-1",
  "chainName": "Osmosis",
  "image": "https://assets.leapwallet.io/osmo.svg",
  "rest": "https://rest.cosmos.directory/osmosis",
  "rpc": "https://rpc.cosmos.directory/osmosis",
  "bip44": {
    "coinType": 118
  },
  "bech32Config": {
    "bech32PrefixAccAddr": "osmosis",
    "bech32PrefixAccPub": "osmosispub",
    "bech32PrefixValAddr": "osmosisvaloper",
    "bech32PrefixValPub": "osmosisvaloperpub",
    "bech32PrefixConsAddr": "osmosisvalcons",
    "bech32PrefixConsPub": "osmosisvalconspub"
  },
  "currencies": [
    {
      "coinDenom": "OSMO",
      "coinMinimalDenom": "uosmo",
      "coinDecimals": 6,
      "coinGeckoId": "osmosis"
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "OSMO",
      "coinMinimalDenom": "uosmo",
      "coinDecimals": 6,
      "coinGeckoId": "osmosis",
      "gasPriceStep": {
        "low": 0.01,
        "average": 0.025,
        "high": 0.03
      }
    }
  ],
  "stakeCurrency": {
    "coinDenom": "OSMO",
    "coinMinimalDenom": "uosmo",
    "coinDecimals": 6,
    "coinGeckoId": "osmosis"
  }
}
```

## License

Distributed under the MIT License. See [license](license) for more information.
