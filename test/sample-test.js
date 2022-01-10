const { expect } = require("chai");
const { ethers } = require("hardhat");
const { list } = require("postcss");

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
      const MarketFactory = await ethers.getContractFactory("NFTMarket");

      const market = await MarketFactory.deploy();
      await market.deployed();
      const marketAddress = market.address;

      const NFTFactory = await ethers.getContractFactory("NFT");
      const nft = await NFTFactory.deploy(marketAddress);
      await nft.deployed();

      const nftContractAddress = nft.address;

      let listingPrice = await market.GetListingPrice();
      listingPrice = listingPrice.toString();

      const auctionPrice = ethers.utils.parseUnits('100', 'ether');

      await nft.CreateToken("https://www.mytokenlocation.com");
      await nft.CreateToken("https://www.mytokenlocation2.com");

      await market.CreateMarketItem(nftContractAddress, 1, auctionPrice, {value: listingPrice});
      await market.CreateMarketItem(nftContractAddress, 2, auctionPrice, {value: listingPrice});

      const [_, buyerAddress] = await ethers.getSigners();
      await market.connect(buyerAddress).CreateMarketSale(nftContractAddress, 1, {value: auctionPrice});
      const items = await market.FetchMarketItems();

      console.log('items: ', items);
  });
});
