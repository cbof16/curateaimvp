const promoteAuction = async (auction) => {
  const { title, description, url, endTime } = auction;
  const tweet = `Auction Alert! 🚨\n\nTitle: ${title}\nDescription: ${description}\nEnd Time: ${endTime}\n\nJoin the auction here: ${url}`;

  console.log('Tweet Posted:', tweet);
};

module.exports = { promoteAuction };
