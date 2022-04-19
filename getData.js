const Web3 = require("web3");

const Abi = require("./abi.json");
const tokenAbi = require("./abi2.json");
const poolAbi = require("./poolAbi.json");
const poolAbi2 = require("./poolAbi2.json");

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

async function getBalance(address) {
  const contract = "0x7EE4b5dbc4b97C30A08791CE8601E695735960dB";

  const stakingInstance = new web3.eth.Contract(Abi, contract);

  const depositsLength = await stakingInstance.methods
    .getDepositsOfLength(address)
    .call();
  const deposits = await stakingInstance.methods.getDepositsOf(address).call();
  let token = await stakingInstance.methods.depositToken().call();
  const tokenInstance = new web3.eth.Contract(tokenAbi, token);

  let symbol = await tokenInstance.methods.symbol().call();

  for (let i = 0; i < depositsLength; i++) {
    console.log((deposits[i].amount / 10 ** 18).toFixed(2), symbol);
  }
}

async function getBalance2(address) {
  const contract = "0x5b2D34C26B5eb7388F54a3E8D4bE3Ac24E7616f9";

  const Instance = new web3.eth.Contract(Abi, contract);

  let LPtokensreceived = await Instance.methods.getDepositsOf(address).call();
  let depositsLength = await Instance.methods
    .getDepositsOfLength(address)
    .call();
  let LP = await Instance.methods.depositToken().call();

  const LPinstance = new web3.eth.Contract(poolAbi, LP);
  let token0 = await LPinstance.methods.token0().call();
  let token1 = await LPinstance.methods.token1().call();
  let reserves = await LPinstance.methods.getReserves().call();
  let totalSupplyLP = await LPinstance.methods.totalSupply().call();

  let token0instance = new web3.eth.Contract(tokenAbi, token0);
  let token1instance = new web3.eth.Contract(tokenAbi, token1);
  let symbol0 = await token0instance.methods.symbol().call();
  let symbol1 = await token1instance.methods.symbol().call();
  let decimals0 = await token0instance.methods.decimals().call();
  let decimals1 = await token0instance.methods.decimals().call();

  for (let i = 0; i < depositsLength; i++) {
    let token0amount = (
      ((LPtokensreceived[i].amount / totalSupplyLP) * reserves[0]) /
      10 ** decimals0
    ).toFixed(2);
    let token1amount = (
      ((LPtokensreceived[i].amount / totalSupplyLP) * reserves[1]) /
      10 ** decimals1
    ).toFixed(2);

    if (token0amount != 0 && token1amount != 0)
      console.log(symbol0, "+", symbol1, token0amount, "+", token1amount);
  }
}

async function getBalance3(address) {
  const contract = "0xEB3CadDe330a4AA3D627F666aEcdD6F65208B19F";

  const Instance = new web3.eth.Contract(Abi, contract);

  let LPtokensreceived = await Instance.methods.getDepositsOf(address).call();
  let depositsLength = await Instance.methods
    .getDepositsOfLength(address)
    .call();

  let poolAddress = "0x9A56f30fF04884cB06da80cB3aEf09c6132f5E77";
  const LPinstance = new web3.eth.Contract(poolAbi2, poolAddress);
  let token0 = await LPinstance.methods.token0().call();
  let token1 = await LPinstance.methods.token1().call();
  let reserves = await LPinstance.methods.getReserves().call();
  let totalSupplyLP = await LPinstance.methods.totalSupply().call();

  let token0instance = new web3.eth.Contract(tokenAbi, token0);
  let token1instance = new web3.eth.Contract(tokenAbi, token1);
  let symbol0 = await token0instance.methods.symbol().call();
  let symbol1 = await token1instance.methods.symbol().call();
  let decimals0 = await token0instance.methods.decimals().call();
  let decimals1 = await token0instance.methods.decimals().call();

  for (let i = 0; i < depositsLength; i++) {
    let token0amount = (
      ((LPtokensreceived[i].amount / totalSupplyLP) * reserves[0]) /
      10 ** decimals0
    ).toFixed(2);
    let token1amount = (
      ((LPtokensreceived[i].amount / totalSupplyLP) * reserves[1]) /
      10 ** decimals1
    ).toFixed(2);

    if (token0amount != 0 && token1amount != 0)
      console.log(symbol0, "+", symbol1, token0amount, "+", token1amount);
  }
}

let address = "0x92d899e0e47ccfe4571527d03dc7fe8aa08968f3";
getBalance(address);
getBalance2(address);
getBalance3(address);
