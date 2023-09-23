const {expect} = require("chai");

// describe("Token contract", function(){
//     it("Deployment should assign the total supply of tokens to the owner", async function(){
//         const [owner] = await ethers.getSigners();
//         const Token = await ethers.getContractFactory("Token");
//         const hardhatToken = await Token.deploy();
//         const ownerBalance = await hardhatToken.balanceOf(owner.address);
//         expect(await hardhatToken.totslSupply()).to.equal(ownerBalance);
//     });
//     it("Should transfer tokens between accounts", async function(){
//         const[owner, addr1, addr2] = await ethers.getSigners();
//         const Token = await ethers.getContractFactory("Token");
//         const hardhatToken = await Token.deploy();
        
//          await hardhatToken.transfer(addr1.address,'5');
//         expect(await hardhatToken.balanceOf(addr1.address).to.equal(5));
       
//         await hardhatToken.connect(addr1).transfer(addr1.address,'2');
//         expect(await hardhatToken.balanceOf(addr2.address).to.equal(2));
//     });

// });

describe("Token contract",function() {
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });

    describe("Deployment", function(){
        it('Should set the right owner', async function() {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });
        it('Should assign the total supply of tokens to the owner', async function() {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transaction",function(){
        it('Should transfer tokens betweeen accounts', async function() {
            // Transfer 5 tokens from owner account -> Addr1 account
            await hardhatToken.transfer(addr1.address,"5");
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            await hardhatToken.connect(addr1).transfer(addr2.address,4);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(4);
        });

        it("Should fail if sender does not have enough tokens", async function() {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect (hardhatToken.connect(addr2).transfer(owner.address,1)).to.be.revertedWith("Insufficient tokens");
            expect (await hardhatToken.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });

        it("Should update balances after transaction", async function() {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address,5);
            await hardhatToken.transfer(addr2.address,10);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);

            const addr1Balace = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balace).to.equal(5);
            const addr2Balace = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balace).to.equal(10);
        });
    });
});