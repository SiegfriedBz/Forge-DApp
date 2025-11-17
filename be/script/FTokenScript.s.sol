// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {FToken} from "../src/FToken.sol";
import {FToken_Constants} from "./Forge_Constants.sol";

contract FTokenScript is Script, FToken_Constants {
    // function setUp() public {}

    function run() public returns (FToken token) {
        console.log("Deploying FToken...");

        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        token = new FToken(TOKEN_URI);
        vm.stopBroadcast();

        console.log("FToken deployed at", address(token));
    }
}
