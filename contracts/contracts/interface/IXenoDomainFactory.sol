// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

interface IXenoDomainFactory {

  function getTldsArray() external view returns(string[] memory);

  function tldNamesAddresses(string memory) external view returns(address);

  function getRoyaltyDetails() external view returns (address, uint);

  function createTld(
    string memory _name,
    string memory _symbol,
    address _tldOwner,
    uint256 _domainPrice,
    bool _buyingEnabled
  ) external payable returns(address);

}