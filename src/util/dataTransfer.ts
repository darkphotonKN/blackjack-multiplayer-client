import {
  ActionType,
  Clients,
  GameMessageBundle,
  MessageBundle,
  MessageType,
} from "../types/message";

// encode action into a buffer
export function encodeAction(
  clientId: string,
  actionType: number,
  actionData: string,
): Buffer {
  const clientIdBuffer = Buffer.from(clientId);
  const clientIdLengthBuffer = Buffer.from([clientId.length]);
  const actionDataBuffer = Buffer.from(actionData);
  const actionTypeBuffer = Buffer.from([actionType]);

  // construct action package into a single Buffer
  const actionPackageBuffer = Buffer.concat([
    clientIdLengthBuffer,
    clientIdBuffer,
    actionTypeBuffer,
    actionDataBuffer,
  ]);

  console.log("actionPackageBuffer", actionPackageBuffer);
  return actionPackageBuffer;
}

// decode buffer into pre-organized info
export function decodeMessage(message: Buffer): GameMessageBundle {
  const clientIdLength = message[0];
  const clientId = message.subarray(1, clientIdLength + 1).toString();
  const selectedMessageType = message[1 + clientIdLength] as MessageType;
  const selectedActionType = message[1 + clientIdLength + 1] as ActionType;
  const selectedActionValue = message
    .subarray(1 + clientIdLength + 1 + 1)
    .toString();

  return {
    clientId,
    selectedMessageType,
    selectedActionType,
    selectedActionValue,
  };
}
