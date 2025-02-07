pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DutchAuction is ReentrancyGuard {
    IERC721 public nft;
    address public seller;
    address public artist;
    uint256 public tokenId;
    uint256 public startingPrice;
    uint256 public reservePrice;
    uint256 public priceDropInterval;
    uint256 public priceDropAmount;
    uint256 public auctionDuration;
    uint256 public auctionStartTime;
    bool public auctionEnded;

    event AuctionCreated(
        address indexed seller,
        uint256 indexed tokenId,
        uint256 startingPrice,
        uint256 reservePrice,
        uint256 priceDropInterval,
        uint256 priceDropAmount,
        uint256 auctionDuration
    );

    event AuctionEnded(address indexed buyer, uint256 finalPrice);

    event DebugLog(string message, uint256 value);

    constructor(
        address _nft,
        uint256 _tokenId,
        uint256 _startingPrice,
        uint256 _reservePrice,
        uint256 _priceDropInterval,
        uint256 _priceDropAmount,
        uint256 _auctionDuration,
        address _artist
    ) {
        nft = IERC721(_nft);
        seller = msg.sender;
        tokenId = _tokenId;
        startingPrice = _startingPrice;
        reservePrice = _reservePrice;
        priceDropInterval = _priceDropInterval;
        priceDropAmount = _priceDropAmount;
        auctionDuration = _auctionDuration;
        auctionStartTime = block.timestamp;
        artist = _artist;
        auctionEnded = false;

        emit AuctionCreated(
            seller,
            tokenId,
            startingPrice,
            reservePrice,
            priceDropInterval,
            priceDropAmount,
            auctionDuration
        );
    }

    function cancelAuction() external {
        require(msg.sender == seller, "Only the seller can cancel the auction");
        require(!auctionEnded, "Auction already ended");

        auctionEnded = true;
        nft.transferFrom(seller, seller, tokenId);

        emit AuctionEnded(address(0), 0);
    }

    function getCurrentPrice() public view returns (uint256) {
        if (block.timestamp >= auctionStartTime + auctionDuration) {
            return reservePrice;
        }

        uint256 elapsedIntervals = (block.timestamp - auctionStartTime) / priceDropInterval;
        uint256 totalPriceDrop = elapsedIntervals * priceDropAmount;
        uint256 currentPrice = startingPrice > totalPriceDrop ? startingPrice - totalPriceDrop : reservePrice;

        return currentPrice > reservePrice ? currentPrice : reservePrice;
    }

    function buy() external payable nonReentrant {
        emit DebugLog("Transferring NFT", tokenId);
        require(!auctionEnded, "Auction already ended");
        uint256 currentPrice = getCurrentPrice();
        require(msg.value >= currentPrice, "Insufficient funds to buy");
        emit DebugLog("Current Price", currentPrice);
        emit DebugLog("Sent Value", msg.value);
        emit DebugLog("Auction Ended", auctionEnded ? 1 : 0);
        emit DebugLog("Auction Start Time", auctionStartTime);
        emit DebugLog("Block Timestamp", block.timestamp);
        emit DebugLog("Auction Duration", auctionDuration);
        emit DebugLog("Reserve Price", reservePrice);
        emit DebugLog("Starting Price", startingPrice);
        emit DebugLog("Price Drop Interval", priceDropInterval);
        emit DebugLog("Price Drop Amount", priceDropAmount);

        auctionEnded = true;
        emit DebugLog("Transferring NFT", tokenId);
        emit DebugLog("Seller", uint256(uint160(seller)));
        emit DebugLog("Buyer", uint256(uint160(msg.sender)));
        emit DebugLog("NFT Owner", uint256(uint160(nft.ownerOf(tokenId))));
        emit DebugLog("NFT Approved", uint256(uint160(nft.getApproved(tokenId))));
        nft.transferFrom(seller, msg.sender, tokenId);
        emit DebugLog("NFT Transferred", tokenId);
        emit DebugLog("NFT Transferred", tokenId);

        uint256 artistRoyalty = (msg.value * 10) / 100;
        uint256 sellerAmount = msg.value - artistRoyalty;

        payable(artist).transfer(artistRoyalty);
        payable(seller).transfer(sellerAmount);

        emit AuctionEnded(msg.sender, currentPrice);
    }
}
