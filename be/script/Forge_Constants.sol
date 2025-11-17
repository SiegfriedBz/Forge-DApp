//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract FToken_Constants {
    string internal constant TOKEN_URI = "ipfs://bafybeif32isnf32jqeppqxzu42jk4vec6ltt7zcy3hozpymgv2a2o3o5ru/";
}

contract Forge_Constants is FToken_Constants {
    uint256 internal constant MAX_TOKEN_ID = 6;
    uint256 internal constant COOL_DOWN_DELAY = 60 seconds;
}
