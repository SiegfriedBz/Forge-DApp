// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Forge} from "../src/Forge.sol";
import {Forge_Constants} from "./Forge_Constants.sol";

contract ForgeScript is Script, Forge_Constants {
    // function setUp() public {}

    function run() public returns (Forge forge) {
        console.log("Deploying Forge...");

        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        // constructor(string memory _tokenUri, uint256 _maxTokenId, uint256 _coolDownDelay) {
        forge = new Forge(TOKEN_URI, MAX_TOKEN_ID, COOL_DOWN_DELAY);
        vm.stopBroadcast();

        console.log("Forge deployed at", address(forge));
    }
}
