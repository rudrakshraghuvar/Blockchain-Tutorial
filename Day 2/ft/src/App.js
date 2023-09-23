import { useState } from "react";
const { Web3 } = require('web3');
const web3 = new Web3(window.ethereum);
// const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/df186f15ed934e3da29ba3ced32a3396"));

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [contract, setContract] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [owner, setOwner] = useState("");
  const [totalsupply, setTotalsupply] = useState("");
  const [balanceof, setBalanceof] = useState("");
  const [allowance, setAllowance] = useState("");
  const [mint, setMint] = useState("");
  const [burn, setBurn] = useState("");
  const [transfer, setTransfer] = useState("");
  const [approve, setApprove] = useState("");
  const [transferfrom, setTransferfrom] = useState("");
  const [burnfrom, setBurnfrom] = useState("");
  const [input1,setInput1] = useState('');
  const [input2,setInput2] = useState('');
  const [input3,setInput3] = useState('');
  const [input4,setInput4] = useState('');
  const [input5,setInput5] = useState('');
  const [input6,setInput6] = useState('');
  const [input7,setInput7] = useState('');
  const [input8,setInput8] = useState('');
  const [input9,setInput9] = useState('');
  const [input10,setInput10] = useState('');
  const [input11,setInput11] = useState('');
  const [input12,setInput12] = useState('');
  const [input13,setInput13] = useState('');
  const [input14,setInput14] = useState('');
  const [input15,setInput15] = useState('');

  const handleInputChange1 = (e) =>{
    setInput1(e.target.value);
  }
  const handleInputChange2 = (e) =>{
    setInput2(e.target.value);
  }
  const handleInputChange3 = (e) =>{
    setInput3(e.target.value);
  }
  const handleInputChange4 = (e) =>{
    setInput4(e.target.value);
  }
  const handleInputChange5 = (e) =>{
    setInput5(e.target.value);
  }
  const handleInputChange6 = (e) =>{
    setInput6(e.target.value);
  }
  const handleInputChange7 = (e) =>{
    setInput7(e.target.value);
  }
  const handleInputChange8 = (e) =>{
    setInput8(e.target.value);
  }
  const handleInputChange9 = (e) =>{
    setInput9(e.target.value);
  }
  const handleInputChange10 = (e) =>{
    setInput10(e.target.value);
  }
  const handleInputChange11 = (e) =>{
    setInput11(e.target.value);
  }
  const handleInputChange12 = (e) =>{
    setInput12(e.target.value);
  }
  const handleInputChange13 = (e) =>{
    setInput13(e.target.value);
  }
  const handleInputChange14 = (e) =>{
    setInput14(e.target.value);
  }
  const handleInputChange15 = (e) =>{
    setInput15(e.target.value);
  }

  const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
      // either we create instance via web3 1st method or we do directly by below method
      // const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const bal = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(bal, "ether"));
      window.ethereum.on('accountsChanged', async(newAccounts) => {
        setAccount(newAccounts[0]);
        const bal = await web3.eth.getBalance(newAccounts[0]);
        setBalance(web3.utils.fromWei(bal, "ether"));
      });
    }
  }

  const connectContract = async () => {
    const Address = "0x70345Ba1b0af8dd4ab1DE7c93b737032DCA10d15";
    const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    setContract(new web3.eth.Contract(ABI, Address));
    setContractAddress(contract._address);
  }

  const own = async () => {
    const owner = await contract.methods.owner().call();
    setOwner(owner);
  }

  const totalSupply = async () => {
    const total = await contract.methods.totalSupply().call();
    setTotalsupply(Number(total));
  }

  const balanceOf = async () => {
    const balance = await contract.methods.balanceOf(input1).call();
    setBalanceof(Number(balance));
  }

  const allow = async () => {
    const allowance = await contract.methods.allowance(input2,input3).call();
    setAllowance(Number(allowance));
  }

  const minting = async () => {
    const txObject = {
      from: account,
      to: contractAddress,
      gas: 500000,
      data: contract.methods.mint(input15, input4).encodeABI(),
    };

    const txHash = await web3.eth.sendTransaction(txObject);
    setMint(txHash.transactionHash);
  }

  const transferring = async () => {
    const txObject = {
      from: account,
      to: contractAddress,
      gas: 500000,
      data: contract.methods.transfer(input6, input7).encodeABI(),
    };

    const txHash = await web3.eth.sendTransaction(txObject);
    setTransfer(txHash.transactionHash);
  }

  const burning = async () => {
    const txObject = {
      from: account,
      to: contractAddress,
      gas: 500000,
      data: contract.methods.burn(input5).encodeABI(),
    };

    const txHash = await web3.eth.sendTransaction(txObject);
    setBurn(txHash.transactionHash);
  }

  const approving = async () => {
    const txObject = {
      from: account,
      to: contractAddress,
      gas: 500000,
      data: contract.methods.approve(input8, input9).encodeABI(),
    };

    const txHash = await web3.eth.sendTransaction(txObject);
    setApprove(txHash.transactionHash);
  }

  const transferFrom = async () => {
    const txObject = {
      from: account,
      to: contractAddress,
      gas: 500000,
      data: contract.methods.transferFrom(input10, input11, input12).encodeABI(),
    };

    const txHash = await web3.eth.sendTransaction(txObject);
    setTransferfrom(txHash.transactionHash);
  }

  const burnFrom = async () => {
    const txObject = {
      from: account,
      to: contractAddress,
      gas: 500000,
      data: contract.methods.burnFrom(input13, input14).encodeABI(),
    };

    const txHash = await web3.eth.sendTransaction(txObject);
    setBurnfrom(txHash.transactionHash);
  }

  return (
    <div className="App">
          <button onClick={connectMetamask}>Connect To Metamask</button>
          <p>Account Address:{account}</p>
          <p>Balance:{balance}</p>
          <button onClick={connectContract}>Connect To Contract</button>
          <p>Contract Address : </p>
          <a href={`https://sepolia.etherscan.io/address/${contractAddress}#code`} target="_blank" rel="noreferrer">{contractAddress}</a>

          <h3 className="read">Read from contract ...</h3>
          <button onClick={own}> Owner </button>
          <p>{owner}</p>
          <button onClick={totalSupply}>TotalSupply</button>
          <p>{totalsupply}</p>
          <button onClick={balanceOf}>BalanceOf</button>
          <input type="text" placeholder="address" value = {input1} onChange={handleInputChange1} />
          <p>{balanceof}</p>
          <button onClick={allow}>Allowance</button>
          <input type="text" placeholder="owner(address)" value = {input2} onChange={handleInputChange2} />
          <input type="text" placeholder="spender(address)" value = {input3} onChange={handleInputChange3} />
          <p>{allowance}</p>

          <h3 className="write">Write from contract ...</h3>
          <button onClick={minting}>Mint</button>
          <input type="text" placeholder="to(address)" value = {input15} onChange={handleInputChange15} />
          <input type="text" placeholder="amount" value = {input4} onChange={handleInputChange4} />
          <p>Transaction Hash : </p>
          <a href={`https://sepolia.etherscan.io/tx/${mint}`} target="_blank" rel="noreferrer">{mint}</a>
          <button onClick={burning}>Burn</button>
          <input type="text" placeholder="amount" value = {input5} onChange={handleInputChange5} />
          <p>Transaction Hash : </p>
          <a href={`https://sepolia.etherscan.io/tx/${burn}`} target="_blank" rel="noreferrer">{burn}</a>
          <button onClick={transferring}>Transfer</button>
          <input type="text" placeholder="to(address)" value = {input6} onChange={handleInputChange6} />
          <input type="text" placeholder="amount" value = {input7} onChange={handleInputChange7} />
          <p>Transaction Hash : </p>
          <a href={`https://sepolia.etherscan.io/tx/${transfer}`} target="_blank" rel="noreferrer">{transfer}</a>
          <button onClick={approving}>Approve</button>
          <input type="text" placeholder="spender(address)" value = {input8} onChange={handleInputChange8} />
          <input type="text" placeholder="amount" value = {input9} onChange={handleInputChange9} />
          <p>Transaction Hash : </p>
          <a href={`https://sepolia.etherscan.io/tx/${approve}`} target="_blank" rel="noreferrer">{approve}</a>
          <button onClick={transferFrom}>TransferFrom</button>
          <input type="text" placeholder="from(address)" value = {input10} onChange={handleInputChange10} />
          <input type="text" placeholder="to(address)" value = {input11} onChange={handleInputChange11} />
          <input type="text" placeholder="amount" value = {input12} onChange={handleInputChange12} />
          <p>Transaction Hash : </p>
          <a href={`https://sepolia.etherscan.io/tx/${transferfrom}`} target="_blank" rel="noreferrer">{transferfrom}</a>
          <button onClick={burnFrom}>BurnFrom</button>
          <input type="text" placeholder="account(address)" value = {input13} onChange={handleInputChange13} />
          <input type="text" placeholder="amount" value = {input14} onChange={handleInputChange14} />
          <p>Transaction Hash : </p>
          <a href={`https://sepolia.etherscan.io/tx/${burnfrom}`} target="_blank" rel="noreferrer">{burnfrom}</a>
    </div>
  );
}
export default App;