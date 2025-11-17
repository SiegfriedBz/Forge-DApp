// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {
    FToken,

    // errors
    FToken__OnlyOwnerAllowed
} from "../src/FToken.sol";
import {FToken_Constants} from "../script/Forge_Constants.sol";
import {FTokenScript} from "../script/FTokenScript.s.sol";

// Tests on FToken in isolation (not deployed by Forge contract)
contract FTokenTest is Test, FToken_Constants {
    FTokenScript public tokenDeployer;
    FToken public token;

    address owner = vm.envAddress("MY_ADDRESS");
    address player01 = makeAddr("player01");

    function setUp() public {
        // 1. deploy FToken deployer
        tokenDeployer = new FTokenScript();
        // 2. deploy FToken
        token = tokenDeployer.run();
    }

    // === deployment Tests ===
    function test_deployment() public view {
        assertEq(token.I_OWNER(), owner);
    }

    // === uri Tests ===
    function test_uri() public view {
        string memory uri = token.uri(1);
        assertEq(uri, string.concat(TOKEN_URI, "1"));
    }

    // === Access Control Tests ===
    function test_mint_RevertWhen_NotOwner() public {
        vm.prank(player01);
        vm.expectRevert(FToken__OnlyOwnerAllowed.selector);
        token.mint(player01, 0, 1);
    }

    function test_burn_RevertWhen_NotOwner() public {
        vm.prank(player01);
        vm.expectRevert(FToken__OnlyOwnerAllowed.selector);
        token.burn(player01, 0, 1);
    }

    function test_burnBatch_RevertWhen_NotOwner() public {
        vm.prank(player01);
        uint256[] memory ids = new uint256[](1);
        uint256[] memory values = new uint256[](1);

        vm.expectRevert(FToken__OnlyOwnerAllowed.selector);
        token.burnBatch(player01, ids, values);
    }
}
