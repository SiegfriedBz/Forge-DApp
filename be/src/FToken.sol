//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @title FToken
 * @author Siegfried Bozza
 */

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/**
 * errors
 */
error FToken__OnlyOwnerAllowed();

/**
 * @title
 * @author
 * @notice address:
 */
contract FToken is ERC1155 {
    using Strings for uint256;

    /**
     * state
     */
    address public immutable I_OWNER;

    /**
     * modifiers
     */
    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    function _onlyOwner() internal view {
        if (msg.sender != I_OWNER) {
            revert FToken__OnlyOwnerAllowed();
        }
    }

    /**
     * functions
     */
    constructor(string memory uri_) ERC1155(uri_) {
        I_OWNER = msg.sender;
    }

    /**
     * @param _to the address to mint to
     * @param _id the tokenId to mint
     * @param _value the amount of tokens to mint
     * @notice onlyOwner modifier => only the Forge contract can call this function
     */
    function mint(address _to, uint256 _id, uint256 _value) external onlyOwner {
        _mint(_to, _id, _value, hex"");
    }

    /**
     * @param _from the address to burn from
     * @param _ids the array of tokenIds to burn
     * @param _values the array of amount of token _ids to burn
     * @notice onlyOwner modifier => only the Forge contract can call this function
     */
    function burnBatch(address _from, uint256[] memory _ids, uint256[] memory _values) external onlyOwner {
        _burnBatch(_from, _ids, _values);
    }

    /**
     * @param _from the address to burn from
     * @param _id the tokenId to burn
     * @param _value the amount of tokens to burn
     * @notice onlyOwner modifier => only the Forge contract can call this function
     */
    function burn(address _from, uint256 _id, uint256 _value) external onlyOwner {
        _burn(_from, _id, _value);
    }

    /**
     * @dev See {IERC1155MetadataURI-uri}.
     *
     * This implementation returns the same URI for *all* token types. It relies
     * on the token type ID substitution mechanism
     * https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the ERC].
     *
     * Clients calling this function must replace the `\{id\}` substring with the
     * actual token type ID.
     */
    function uri(uint256 id) public view override returns (string memory) {
        string memory baseURI = super.uri(id);

        return bytes(baseURI).length > 0 ? string.concat(baseURI, id.toString()) : "";
    }
}
