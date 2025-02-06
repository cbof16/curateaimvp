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
        require(!auctionEnded, "Auction already ended");
        uint256 currentPrice = getCurrentPrice();
        require(msg.value >= currentPrice, "Insufficient funds to buy");

        auctionEnded = true;
        nft.transferFrom(seller, msg.sender, tokenId);

        uint256 artistRoyalty = (msg.value * 10) / 100;
        uint256 sellerAmount = msg.value - artistRoyalty;

        payable(artist).transfer(artistRoyalty);
        payable(seller).transfer(sellerAmount);

        emit AuctionEnded(msg.sender, currentPrice);
    }
}
