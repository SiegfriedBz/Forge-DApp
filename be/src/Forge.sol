//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @title Forge
 * @author Siegfried Bozza
 */

import {FToken} from "./FToken.sol";

/**
 * errors
 */
error Forge__OnlyOwnerAllowed();
error Forge__UserInCoolDown(address user);
error Forge__InvalidToken(uint256 tokenId);
error Forge__CanOnlyBurnForgedToken(uint256 tokenId);
error Forge__CanNotTradeForSameToken(uint256 tokenId);
error Forge__CanOnlyTradeForBasicToken(uint256 tokenId);

contract Forge {
    /**
     * events
     */
    event Forge__MintToken(address indexed user, uint256 indexed tokenId, uint256 indexed amount);
    event Forge__ForgeToken(address indexed user, uint256 indexed tokenId, uint256 indexed amount);
    event Forge__BurnToken(address indexed user, uint256 indexed tokenId, uint256 indexed amount);
    event Forge__Trade(address indexed user, uint256 indexed burnedTokenId, uint256 indexed mintedTokenId);

    /**
     * state
     */
    address public immutable I_OWNER;
    FToken public immutable I_TOKEN;
    uint256 public immutable I_MAX_TOKEN_ID;
    uint256 public coolDownDelay;
    mapping(address user => uint256 coolDownTimer) public userCoolDownTimer;

    /**
     * modifiers
     */
    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    function _onlyOwner() internal view {
        if (msg.sender != I_OWNER) {
            revert Forge__OnlyOwnerAllowed();
        }
    }

    /**
     * functions - constructor
     * deploy Token contract and set pointer
     */
    constructor(string memory _tokenUri, uint256 _maxTokenId, uint256 _coolDownDelay) {
        I_OWNER = msg.sender;
        I_MAX_TOKEN_ID = _maxTokenId;
        I_TOKEN = new FToken(_tokenUri);
        coolDownDelay = _coolDownDelay;
    }

    /**
     * @param _tokenId the tokenId to mint or forge
     */
    function mint(uint256 _tokenId) public {
        if (_tokenId > I_MAX_TOKEN_ID) {
            revert Forge__InvalidToken(_tokenId);
        }

        /**
         * token 0..2 => Mint
         * 1-minute cooldown between mints
         * only 1 token can be minted per call
         */
        if (_tokenId == 0 || _tokenId == 1 || _tokenId == 2) {
            if (block.timestamp < userCoolDownTimer[msg.sender]) {
                revert Forge__UserInCoolDown(msg.sender);
            } else {
                userCoolDownTimer[msg.sender] = block.timestamp + coolDownDelay;
                I_TOKEN.mint(msg.sender, _tokenId, 1);

                emit Forge__MintToken(msg.sender, _tokenId, 1);
            }
        }
        /**
         * token 3..6 => Forge (burn to mint)
         * only 1 token can be forged per call
         */
        else {
            (uint256[] memory ids, uint256[] memory values) = getForgeData(_tokenId);

            I_TOKEN.burnBatch(msg.sender, ids, values);
            I_TOKEN.mint(msg.sender, _tokenId, 1);

            emit Forge__ForgeToken(msg.sender, _tokenId, 1);
        }
    }

    /**
     * @param _tokenId the tokenId to burn
     * @param _value the amount of tokenId to burn
     * @notice only tokens [3-6] can burn
     */
    function burn(uint256 _tokenId, uint256 _value) public {
        if (_tokenId > I_MAX_TOKEN_ID) {
            revert Forge__InvalidToken(_tokenId);
        }

        if (_tokenId != 3 && _tokenId != 4 && _tokenId != 5 && _tokenId != 6) {
            revert Forge__CanOnlyBurnForgedToken(_tokenId);
        }

        I_TOKEN.burn(msg.sender, _tokenId, _value);

        emit Forge__BurnToken(msg.sender, _tokenId, _value);
    }

    /**
     * Simple Trade Function (Burn & Mint)
     * @param _tokenIdToBurn the tokenId to burn
     * @param _tokenIdToMint the tokenId to mint - Must be 0..2
     */
    function trade(uint256 _tokenIdToBurn, uint256 _tokenIdToMint) public {
        if (_tokenIdToBurn == _tokenIdToMint) {
            revert Forge__CanNotTradeForSameToken(_tokenIdToMint);
        }
        if (_tokenIdToMint != 0 && _tokenIdToMint != 1 && _tokenIdToMint != 2) {
            revert Forge__CanOnlyTradeForBasicToken(_tokenIdToMint);
        }

        I_TOKEN.burn(msg.sender, _tokenIdToBurn, 1);
        I_TOKEN.mint(msg.sender, _tokenIdToMint, 1);

        emit Forge__Trade(msg.sender, _tokenIdToBurn, _tokenIdToMint);
    }

    /**
     * Admin function to set coolDownDelay
     */
    function setCoolDownDelay(uint256 _coolDownDelay) public onlyOwner {
        coolDownDelay = _coolDownDelay;
    }

    /**
     * helpers
     */
    function getForgeData(uint256 _tokenId) public pure returns (uint256[] memory, uint256[] memory) {
        uint256[] memory ids;
        uint256[] memory values;

        // Allocate memory for 2 elements if _tokenId is 3, 4, or 5
        if (_tokenId == 3 || _tokenId == 4 || _tokenId == 5) {
            ids = new uint256[](2);
            values = new uint256[](2);

            if (_tokenId == 3) {
                ids[0] = 0;
                ids[1] = 1;
            } else if (_tokenId == 4) {
                ids[0] = 1;
                ids[1] = 2;
            } else if (_tokenId == 5) {
                ids[0] = 0;
                ids[1] = 2;
            }

            values[0] = 1;
            values[1] = 1;
        }
        // Allocate memory for 3 elements if _tokenId is 6
        else if (_tokenId == 6) {
            ids = new uint256[](3);
            values = new uint256[](3);

            ids[0] = 0;
            ids[1] = 1;
            ids[2] = 2;

            values[0] = 1;
            values[1] = 1;
            values[2] = 1;
        }

        return (ids, values);
    }
}
