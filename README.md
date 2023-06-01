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

1. Create a [new issue (by clicking here)](https://github.com/leapwallet/developers/issues/new?assignees=&labels=enhancement&projects=&template=add-chain.md&title=Add+Chain+-+%3Cchain-id%3E) with the name "Add Chain - `<chain-id>`".
2. Upload the logo of the chain in the issue. One of the maintainers will add the logo to leap's assets cdn.
3. Fork the repository and start a PR with the name "Add Chain - `<chain-id>`".
4. Add the chain data to `data/chain-store` folder with the name `<chain-id>.json`. You can use the chain logo from step 2. Data format is given [below](#chain-data-structure).
5. Once the chain data is added, run the tests using `npm run test`. If the tests are failing, please fix the errors printed out in the test results.
6. Once you've made sure that the data is valid, run the project and check if the "Add Chain" button for your chain is working as expected by opening [http://localhost:3000/developers/chain-store](http://localhost:3000/developers/chain-store).
7. Once you puAutomated checks will be run on the PR. If the checks pass, the PR will be reviewed by one of the maintainers.
8. Once reviewed and approved, the PR will be merged and the chain will be added to the Chain Store.

#### Guidelines

- Make sure the chain is not already added to the Chain Store.
- Make sure the chain data is valid JSON.
- Chain logos should be in PNG/SVG format with size of at least 256px and maximum 512px, and with 1:1 aspect ratio.
- Node URLs
  - Please check if the REST/RPC node are working fine.
  - Please verify that your chain-id matches the node's chain-id.

#### Chain Data Structure

```json
{
  "chainId": "osmosis-1",
  "chainName": "Osmosis",
  "image": "https://assets.leapwallet.io/osmo.svg",
  "rest": "https://rest.cosmos.directory/osmosis",
  "rpc": "https://rpc.cosmos.directory/osmosis",
  "theme": {
    "primaryColor": "#726FDC",
    "gradient": "linear-gradient(180deg, rgba(114, 111, 220, 0.32) 0%, rgba(114, 111, 220, 0) 100%)",
  },
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

Field Descriptions - 

- `chainId`: chainId in a form of {identifier}-{version} (ex. cosmoshub-4)
- `chainName`: the name of the chain that will be displayed on the wallet
- `image`: (Optional) Image URL of the chain.
- `theme`: (Optional) Information for UI theming on said chain inside the wallet
- `rpc`: URL of RPC endpoint of the chain
- `rest`: URL of REST/API endpoint of the chain
- `bip44`: BIP-44 coin type
- `bech32Config`: prefix used at the beginning of the address
- `currencies`: the list of the supported currencies
- `feeCurrencies`: the list of the tokens that are accepted by the validators for fees
- `stakeCurrency`: the staking token of the chain
- `features`: any other features that are additionally supported by the chain. Although we don't support feature flags right now, this may be useful in the future.

## License

Distributed under the MIT License. See [license](license) for more information.
