import { gameAction, gameState } from "../types/game/card.types";
import {
  ActionType,
  Clients,
  GameMessageBundle,
  MessageType,
  clientsList,
} from "../types/message";
import { isCard, isClients } from "./typeGuards";

// encode message components into a single buffer
export function encodeMessage(gameMessageBundle: GameMessageBundle): Buffer {
  const {
    clientId,
    selectedMessageType,
    selectedActionType,
    selectedActionValue,
  } = gameMessageBundle;

  const clientIdLengthBuffer = Buffer.from([clientId.length]);
  const clientIdBuffer = Buffer.from(clientId);
  const messageTypeBuffer = Buffer.from([selectedMessageType]);
  const actionTypeBuffer = Buffer.from([selectedActionType]);
  let actionValueBuffer: Buffer | undefined = undefined;

  // convert value to buffer based on selectedActionType and chosenActionValues
  switch (selectedActionType) {
    // Game State Actions
    case gameState.INIT_GAME || gameState.RESET_GAME: {
      // convert array of deck information into string then into a buffer
      if (typeof selectedActionValue !== "string") {
        actionValueBuffer = Buffer.from(JSON.stringify(selectedActionValue));
      } else {
        throw new Error(
          "selectedActionValue is not the correct type 'Deck' when matching against the chosenActionType.",
        );
      }
    }

    // Clients List Actions
    case clientsList.CLIENT_LIST: {
      // check that value passed in matches Clients type
      if (isClients(selectedActionValue)) {
        console.log("encoding clients for browser-client");
        // TODO: Currently sending client's WS object back - don't actually need to
        actionValueBuffer = encodeClients(selectedActionValue);
      } else {
        throw new Error(
          "selectedActionValue is not the correct type 'Clients' when matching against the chosenActionType.",
        );
      }
    }

    // Game Action Actions
    case gameAction.DRAW_CARD: {
      // check that value passed in matches the Card type
      if (isCard(selectedActionValue)) {
        actionValueBuffer = Buffer.from(JSON.stringify(selectedActionValue));
      }
    }

    // Default case, everything else is a string
    default: {
      if (typeof selectedActionValue === "string") {
        actionValueBuffer = Buffer.from(selectedActionValue);
      }
    }
  }

  if (!actionValueBuffer) {
    throw new Error("Action Value while encoding message was invalid.");
  }

  // construct action package into a single Buffer
  const actionPackageBuffer = Buffer.concat([
    clientIdLengthBuffer,
    clientIdBuffer,
    messageTypeBuffer,
    actionTypeBuffer,
    actionValueBuffer,
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
  const actionBuffer = message.subarray(1 + clientIdLength + 1 + 1);

  // convert action value differently depending on transfered action value type
  let selectedActionValue;
  switch (selectedActionType) {
    case clientsList.CLIENT_LIST:
    case gameAction.DRAW_CARD:
    case gameState.INIT_GAME:
    case gameState.RESET_GAME: {
      console.log("Type is to be parsed!!!");
      selectedActionValue = JSON.parse(actionBuffer.toString());
    }
    // every other situation just revert the Buffer back to a string
    default: {
      selectedActionValue = actionBuffer.toString();
    }
  }

  return {
    clientId,
    selectedMessageType,
    selectedActionType,
    selectedActionValue,
  };
}

// encode list of clients into a buffer
export function encodeClients(clients: Clients): Buffer {
  const clientsJson = JSON.stringify(Object.fromEntries(clients));

  return Buffer.from(clientsJson);
}
