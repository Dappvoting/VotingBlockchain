const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DappVotesModule", (m) => {
  // Giả sử bạn có một số tham số mặc định hoặc tham số có thể truyền vào
  const initialParam = m.getParameter("initialParam", 0); // Ví dụ tham số ban đầu

  const dappVotes = m.contract("DappVotes", [initialParam]);

  return { dappVotes };
});