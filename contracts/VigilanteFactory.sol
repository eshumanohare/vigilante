// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

import "./VigilanteCore.sol";

contract VigilanteFactory {
    address public creator;
    mapping(uint256 => address) public allCores;

    event CoreCreated(
        address indexed official,
        uint256 indexed departmentID,
        address indexed creator
    );

    constructor() public {
        creator = msg.sender;
    }

    function creatorCore(
        uint256 departmentID,
        address official
    ) external CreatorOnly returns (address core) {
        require(official != address(0), "Error: Address != 0x0");
        bytes32 salt = keccak256(abi.encode(creator, departmentID, official));
        core = address(new VigilanteCore{salt: salt}(departmentID, official));

        require(core != address(0), "Error: Failed creating core contract");
        allCores[departmentID] = core;
        emit CoreCreated(official, departmentID, creator);
    }

    // modifiers
    modifier CreatorOnly() {
        require(msg.sender == creator, "Error: You are not the creator");
        _;
    }

    // setters
    function changeCreator(
        address newCreator
    ) external CreatorOnly returns (bool) {
        require(newCreator != address(0), "Error: Address != 0x0");
        creator = newCreator;
        return true;
    }

    // getters
    function getCreator() external view returns (address) {
        return creator;
    }
}
