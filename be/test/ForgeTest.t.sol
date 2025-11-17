// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {
    Forge,

    // errors
    Forge__InvalidToken,
    Forge__UserInCoolDown,
    Forge__CanOnlyBurnForgedToken,
    Forge__CanNotTradeForSameToken,
    Forge__CanOnlyTradeForBasicToken
} from "../src/Forge.sol";
import {Forge_Constants} from "../script/Forge_Constants.sol";
import {ForgeScript} from "../script/ForgeScript.s.sol";
import {FToken} from "../src/FToken.sol";

contract ForgeTest is Test, Forge_Constants {
    ForgeScript public forgeDeployer;
    Forge public forge;
    FToken public token;

    address owner = vm.envAddress("MY_ADDRESS");
    address player01 = makeAddr("player01");
    address player02 = makeAddr("player02");

    function setUp() public {
        // 1. deploy Forge deployer
        forgeDeployer = new ForgeScript();
        // 2. deploy Forge
        forge = forgeDeployer.run();
    }

    // === deployment Tests ===
    function test_deployment() public view {
        assertEq(forge.I_MAX_TOKEN_ID(), MAX_TOKEN_ID);
        assertEq(forge.I_COOL_DOWN_DELAY(), COOL_DOWN_DELAY);

        FToken _token = forge.I_TOKEN();
        address tokenContractOwner = _token.I_OWNER();

        assertEq(tokenContractOwner, address(forge));
    }

    // === mint Tests - Basic Tokens (0-2) ===
    /**
     * Minting Rules for Basic Tokens (0, 1, 2):
     *
     * Action: mint(_tokenId).
     * Cooldown: COOL_DOWN_DELAY between mints per user.
     * Limit: 1 token per call.
     */

    function test_mintBasicToken_AppliesCooldown() public {
        vm.startPrank(player01);

        // 1. player01 mints 1st basic-token
        forge.mint(0); // First mint

        // 2. player01 tries to mint 2nd basic-token BEFORE cool down ends
        vm.warp(block.timestamp + COOL_DOWN_DELAY - 1);
        vm.expectRevert(abi.encodeWithSelector(Forge__UserInCoolDown.selector, player01));
        forge.mint(1); // Should revert (player01 in cooldown)

        // 3. player01 mints 2nd basic-token AFTER cool down ends
        vm.warp(block.timestamp + 2);
        vm.expectEmit();
        // emit Forge__MintToken(msg.sender, _tokenId, 1);
        emit Forge.Forge__MintToken(player01, 2, 1);
        forge.mint(2);

        assertEq(forge.I_TOKEN().balanceOf(player01, 0), 1);
        assertEq(forge.I_TOKEN().balanceOf(player01, 1), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 2), 1);

        vm.stopPrank();
    }

    // === mint Tests - Forged Tokens (3-6) ===
    /**
     * Minting Rules for Forged Tokens (3, 4, 5, 6):
     *
     * Action: mint(_tokenId).
     * Requirements:
     *
     * Token 3: Burn 1x token 0 + 1x token 1.
     * Token 4: Burn 1x token 1 + 1x token 2.
     * Token 5: Burn 1x token 0 + 1x token 2.
     * Token 6: Burn 1x token 0 + 1x token 1 + 1x token 2.
     */
    function test_mintForgedToken3_UsingTokens0And1() public {
        vm.startPrank(player01);

        forge.mint(0); // Mint token 0
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(1); // Mint token 1

        vm.expectEmit();
        // emit Forge__ForgeToken(msg.sender, _tokenId, 1);
        emit Forge.Forge__ForgeToken(player01, 3, 1);
        forge.mint(3); // Forge token 3 (burns 0 + 1)

        vm.stopPrank();

        assertEq(forge.I_TOKEN().balanceOf(player01, 3), 1);
        assertEq(forge.I_TOKEN().balanceOf(player01, 0), 0); // Burned
        assertEq(forge.I_TOKEN().balanceOf(player01, 1), 0); // Burned
    }

    function test_mintForgedToken4_UsingTokens1And2() public {
        vm.startPrank(player01);

        forge.mint(1); // Mint token 1
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(2); // Mint token 2

        vm.expectEmit();
        // emit Forge__ForgeToken(msg.sender, _tokenId, 1);
        emit Forge.Forge__ForgeToken(player01, 4, 1);
        forge.mint(4); // Forge token 4 (burns 1 + 2)

        vm.stopPrank();

        assertEq(forge.I_TOKEN().balanceOf(player01, 4), 1);
        assertEq(forge.I_TOKEN().balanceOf(player01, 1), 0); // Burned
        assertEq(forge.I_TOKEN().balanceOf(player01, 2), 0); // Burned
    }

    function test_mintForgedToken5_UsingTokens0And2() public {
        vm.startPrank(player01);

        forge.mint(0); // Mint token 0
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(2); // Mint token 2

        vm.expectEmit();
        // emit Forge__ForgeToken(msg.sender, _tokenId, 1);
        emit Forge.Forge__ForgeToken(player01, 5, 1);
        forge.mint(5); // Forge token 5 (burns 0 + 2)

        vm.stopPrank();

        assertEq(forge.I_TOKEN().balanceOf(player01, 5), 1);
        assertEq(forge.I_TOKEN().balanceOf(player01, 0), 0); // Burned
        assertEq(forge.I_TOKEN().balanceOf(player01, 2), 0); // Burned
    }

    function test_mintForgedToken6_UsingTokens0And1And2() public {
        vm.startPrank(player01);

        forge.mint(0); // Mint token 0
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(1); // Mint token 1
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(2); // Mint token 2

        vm.expectEmit();
        // emit Forge__ForgeToken(msg.sender, _tokenId, 1);
        emit Forge.Forge__ForgeToken(player01, 6, 1);
        forge.mint(6); // Forge token 5 (burns 0 + 1 + 2)

        vm.stopPrank();

        assertEq(forge.I_TOKEN().balanceOf(player01, 6), 1);
        assertEq(forge.I_TOKEN().balanceOf(player01, 0), 0); // Burned
        assertEq(forge.I_TOKEN().balanceOf(player01, 1), 0); // Burned
        assertEq(forge.I_TOKEN().balanceOf(player01, 2), 0); // Burned
    }

    // === mint Tests - Unhappy Path ===
    // Test minting token 3 with insufficient tokens
    function test_mintForgedToken3_RevertWhen_Token1Missing() public {
        vm.startPrank(player01);

        forge.mint(0); // Only token 0 (missing token 1 for token 3)
        vm.expectRevert(abi.encode("ERC1155InsufficientBalance(0x7a802d57d8BB9Cc2367d302f85084e53905A7a98, 0, 1, 1)")); // Reverts (ERC1155: insufficient balance)
        forge.mint(3);

        vm.stopPrank();
    }

    function test_mintForgedToken3_RevertWhen_Token0Missing() public {
        vm.startPrank(player01);

        forge.mint(1);
        vm.expectRevert(abi.encode("ERC1155InsufficientBalance(0x7a802d57d8BB9Cc2367d302f85084e53905A7a98, 0, 1, 0)")); // Reverts (ERC1155: insufficient balance)
        forge.mint(3);

        vm.stopPrank();
    }

    // Test minting token 4 with insufficient tokens
    function test_mintForgedToken4_RevertWhen_Token2Missing() public {
        vm.startPrank(player01);

        forge.mint(1);
        vm.expectRevert(abi.encode("ERC1155InsufficientBalance(0x7a802d57d8BB9Cc2367d302f85084e53905A7a98, 0, 1, 2)")); // Reverts (ERC1155: insufficient balance)
        forge.mint(4);

        vm.stopPrank();
    }

    function test_mintForgedToken4_RevertWhen_Token1Missing() public {
        vm.startPrank(player01);

        forge.mint(2);
        vm.expectRevert(abi.encode("ERC1155InsufficientBalance(0x7a802d57d8BB9Cc2367d302f85084e53905A7a98, 0, 1, 1)")); // Reverts (ERC1155: insufficient balance)
        forge.mint(4);

        vm.stopPrank();
    }

    // Test minting token 5 with insufficient tokens
    function test_mintForgedToken5_RevertWhen_Token0Missing() public {
        vm.startPrank(player01);

        forge.mint(2);
        vm.expectRevert(abi.encode("ERC1155InsufficientBalance(0x7a802d57d8BB9Cc2367d302f85084e53905A7a98, 0, 1, 0)")); // Reverts (ERC1155: insufficient balance)
        forge.mint(5);

        vm.stopPrank();
    }

    function test_mintForgedToken5_RevertWhen_Token2Missing() public {
        vm.startPrank(player01);

        forge.mint(0);
        vm.expectRevert(abi.encode("ERC1155InsufficientBalance(0x7a802d57d8BB9Cc2367d302f85084e53905A7a98, 0, 1, 2)")); // Reverts (ERC1155: insufficient balance)
        forge.mint(5);

        vm.stopPrank();
    }

    // Test minting token 6 with insufficient tokens
    function test_mintForgedToken6_RevertWhen_MissingTokens() public {
        vm.startPrank(player01);
        forge.mint(0); // Only token 0 (missing 1 and 2 for token 6)

        vm.expectRevert(abi.encode("ERC1155InsufficientBalance(0x7a802d57d8BB9Cc2367d302f85084e53905A7a98, 0, 1, 1)")); // Reverts (ERC1155: insufficient balance)
        forge.mint(6);

        vm.stopPrank();
    }

    // Test minting invalid tokenId
    function test_mint_RevertWhen_InvalidTokenId() public {
        uint256 invalidTokenId = MAX_TOKEN_ID + 1;

        vm.prank(player01);
        vm.expectRevert(abi.encodeWithSelector(Forge__InvalidToken.selector, invalidTokenId));
        forge.mint(invalidTokenId);
    }

    function test_mint_RevertWhen_EdgeInvalidTokenId() public {
        uint256 max = type(uint256).max;

        vm.prank(player01);
        vm.expectRevert(abi.encodeWithSelector(Forge__InvalidToken.selector, max));
        forge.mint(max);
    }

    // === burn Tests ===
    /**
     * Burning Rules
     *
     * Only Forged Tokens (tokens 3-6) can be burned directly
     */

    // Test burning token 3
    function test_burnToken3() public {
        vm.startPrank(player01);

        // Mint tokens 0 + 1 to be able to forge token 3
        forge.mint(0);
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(1);
        forge.mint(3); // Forge token 3

        vm.expectEmit();
        // emit Forge__BurnToken(msg.sender, _tokenId, _value);
        emit Forge.Forge__BurnToken(player01, 3, 1);
        forge.burn(3, 1); // Burn token 3

        assertEq(forge.I_TOKEN().balanceOf(player01, 0), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 1), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 3), 0);

        vm.stopPrank();
    }

    // Test burning token 4
    function test_burnToken4() public {
        vm.startPrank(player01);

        // Mint tokens 1 + 2 to be able to forge token 4
        forge.mint(1);
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(2);
        forge.mint(4); // Forge token 4

        vm.expectEmit();
        // emit Forge__BurnToken(msg.sender, _tokenId, _value);
        emit Forge.Forge__BurnToken(player01, 4, 1);
        forge.burn(4, 1); // Burn token 4

        assertEq(forge.I_TOKEN().balanceOf(player01, 1), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 2), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 4), 0);

        vm.stopPrank();
    }

    // Test burning token 5
    function test_burnToken5() public {
        vm.startPrank(player01);

        // Mint tokens 0 + 2 to be able to forge token 5
        forge.mint(0);
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(2);
        forge.mint(5); // Forge token 5

        vm.expectEmit();
        // emit Forge__BurnToken(msg.sender, _tokenId, _value);
        emit Forge.Forge__BurnToken(player01, 5, 1);
        forge.burn(5, 1); // Burn token 5

        assertEq(forge.I_TOKEN().balanceOf(player01, 0), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 2), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 5), 0);

        vm.stopPrank();
    }

    // Test burning token 6
    function test_burnToken6() public {
        vm.startPrank(player01);

        // Mint tokens 0 + 1 + 2 to be able to forge token 6
        forge.mint(0);
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(1);
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(2);
        forge.mint(6); // Forge token 6

        vm.expectEmit();
        // emit Forge__BurnToken(msg.sender, _tokenId, _value);
        emit Forge.Forge__BurnToken(player01, 6, 1);
        forge.burn(6, 1); // Burn token 6

        assertEq(forge.I_TOKEN().balanceOf(player01, 0), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 1), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 2), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 6), 0);

        vm.stopPrank();
    }

    // === burn Tests - Unhappy Path ===
    // Test burning basic token 0
    function test_burn_RevertWhen_BasicToken0() public {
        vm.prank(player01);
        vm.expectRevert(abi.encodeWithSelector(Forge__CanOnlyBurnForgedToken.selector, 0));
        forge.burn(0, 1);
    }

    // Test burning basic token 1
    function test_burn_RevertWhen_BasicToken1() public {
        vm.prank(player01);
        vm.expectRevert(abi.encodeWithSelector(Forge__CanOnlyBurnForgedToken.selector, 1));
        forge.burn(1, 1);
    }

    // Test burning basic token 2
    function test_burn_RevertWhen_BasicToken2() public {
        vm.prank(player01);
        vm.expectRevert(abi.encodeWithSelector(Forge__CanOnlyBurnForgedToken.selector, 2));
        forge.burn(2, 1);
    }

    // Test burning invalid tokenId
    function test_burn_RevertWhen_InvalidTokenId() public {
        uint256 invalidTokenId = MAX_TOKEN_ID + 1;

        vm.prank(player01);
        vm.expectRevert(abi.encodeWithSelector(Forge__InvalidToken.selector, invalidTokenId));
        forge.burn(invalidTokenId, 1);
    }

    // === trade Tests ===
    /**
     * Trading Rules
     *
     * Burn any token to mint tokens 0-2.
     * Cannot trade a token for itself.
     */
    // Test trading token 3 for token 0
    function test_tradeToken3ForToken0() public {
        vm.startPrank(player01);

        // Mint tokens 0 + 1 to forge token 3
        forge.mint(0);
        vm.warp(block.timestamp + COOL_DOWN_DELAY + 1);
        forge.mint(1);

        forge.mint(3); // Forge token 3

        vm.expectEmit();
        //  emit Forge__Trade(msg.sender, _tokenIdToBurn, _tokenIdToMint);
        emit Forge.Forge__Trade(player01, 3, 0);
        forge.trade(3, 0); // Trade token 3 for token 0

        assertEq(forge.I_TOKEN().balanceOf(player01, 0), 1);
        assertEq(forge.I_TOKEN().balanceOf(player01, 1), 0);
        assertEq(forge.I_TOKEN().balanceOf(player01, 3), 0);

        vm.stopPrank();
    }

    // === trade Tests - Unhappy Path ===
    // Test trading identical tokens
    function test_trade_RevertWhen_SameTokens() public {
        vm.prank(player01);

        forge.mint(1);

        vm.expectRevert(abi.encodeWithSelector(Forge__CanNotTradeForSameToken.selector, 1));
        forge.trade(1, 1);
    }

    // Test trading to get Forged Tokens (3..6)
    function test_trade_RevertWhen_TryingToGetForgedToken3() public {
        vm.prank(player01);

        forge.mint(1);

        vm.expectRevert(abi.encodeWithSelector(Forge__CanOnlyTradeForBasicToken.selector, 3));
        forge.trade(1, 3);
    }

    function test_trade_RevertWhen_TryingToGetForgedToken4() public {
        vm.prank(player01);

        forge.mint(1);

        vm.expectRevert(abi.encodeWithSelector(Forge__CanOnlyTradeForBasicToken.selector, 4));
        forge.trade(1, 4);
    }

    function test_trade_RevertWhen_TryingToGetForgedToken5() public {
        vm.prank(player01);

        forge.mint(1);

        vm.expectRevert(abi.encodeWithSelector(Forge__CanOnlyTradeForBasicToken.selector, 5));
        forge.trade(1, 5);
    }

    function test_trade_RevertWhen_TryingToGetForgedToken6() public {
        vm.prank(player01);

        forge.mint(1);

        vm.expectRevert(abi.encodeWithSelector(Forge__CanOnlyTradeForBasicToken.selector, 6));
        forge.trade(1, 6);
    }

    // === getForgeData Tests ===
    // Test getForgeData for token 6 (3 inputs)
    function test_getForgeData_Token6() public view {
        (uint256[] memory ids, uint256[] memory values) = forge.getForgeData(6);

        assertEq(ids.length, 3);
        assertEq(ids[0], 0);
        assertEq(ids[1], 1);
        assertEq(ids[2], 2);
        assertEq(values[0], 1);
        assertEq(values[1], 1);
        assertEq(values[2], 1);
    }
}
