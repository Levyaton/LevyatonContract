// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScheduledMessage {
    address public owner;
    string[] public scheduledMessages;
    uint256 public currentMessageIndex;
    uint256 public lastTriggeredBlock;
    string public constant TEASER = "Stand by for further instructions";

    event MessageReleased(uint256 blockNumber, string message);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        lastTriggeredBlock = 0;
        currentMessageIndex = 0;
    }

    /**
     * @notice Splits the provided fullMessage into `parts` segments and appends a hint as the final segment.
     * @param fullMessage The message to split.
     * @param parts The number of parts to split the message into.
     * @param hint The hint to append after the parts.
     */
    function scheduleMessage(string memory fullMessage, uint256 parts, string memory hint) public onlyOwner {
        require(parts > 0, "Parts must be > 0");
        bytes memory fullBytes = bytes(fullMessage);
        uint256 L = fullBytes.length;
        require(parts <= L, "Parts cannot exceed message length");

        // Clear previous schedule.
        delete scheduledMessages;
        currentMessageIndex = 0;
        
        // Calculate base size and remainder.
        uint256 basePartSize = L / parts;
        uint256 remainder = L % parts;
        
        for (uint256 i = 0; i < parts; i++) {
            uint256 extra = i < remainder ? 1 : 0;
            uint256 currentPartSize = basePartSize + extra;
            uint256 start = i * basePartSize + (i < remainder ? i : remainder);
            
            bytes memory partBytes = new bytes(currentPartSize);
            for (uint256 j = 0; j < currentPartSize; j++) {
                partBytes[j] = fullBytes[start + j];
            }
            scheduledMessages.push(string(partBytes));
        }
        // Append the hint as the final segment.
        scheduledMessages.push(hint);
    }

    /**
     * @notice Triggers a message release if none has been released in the current block.
     * This is intended to be called from our ETH transfer helper contract.
     */
    function triggerRelease() external {
        if (block.number > lastTriggeredBlock) {
            lastTriggeredBlock = block.number;
            string memory messageToRelease;
            if (currentMessageIndex < scheduledMessages.length) {
                messageToRelease = scheduledMessages[currentMessageIndex];
                currentMessageIndex++;
            } else {
                messageToRelease = TEASER;
            }
            emit MessageReleased(block.number, messageToRelease);
        }
    }

    function getScheduledCount() public view returns (uint256) {
        return scheduledMessages.length;
    }
}
