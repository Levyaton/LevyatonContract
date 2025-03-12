// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// We import the interface of our ScheduledMessage contract.
interface IScheduledMessage {
    function triggerRelease() external;
}

contract ETHTransferTrigger {
    IScheduledMessage public scheduledMessage;

    // Set the ScheduledMessage contract address at deployment.
    constructor(address _scheduledMessage) {
        scheduledMessage = IScheduledMessage(_scheduledMessage);
    }

    /**
     * @notice Transfers ETH to a recipient and then triggers the scheduled message release.
     * @param recipient The address to receive the ETH.
     * This function must be called with a nonzero msg.value.
     */
    function transferAndTrigger(address payable recipient) external payable {
        require(msg.value > 0, "Must send ETH");
        // Forward ETH to the recipient.
        recipient.transfer(msg.value);
        // Trigger the scheduled message release.
        scheduledMessage.triggerRelease();
    }
}
