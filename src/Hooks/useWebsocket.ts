import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setClientInformation } from "../state/slices/clientSlice";
import { decodeMessage } from "../util/dataTransfer";
import { clientsList } from "../types/message";
import { isClientInformation } from "../util/typeGuards";

/**
 * Sets up websocket connections and clean up
 */

const useWebsocket = () => {
  // persist websocket instance across re-renders
  const wsRef = useRef<WebSocket | null>();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("@useWebSocket lifecycle init");
    // determine window scheme
    const protocol = window.location.protocol;

    // connect to websocket
    const WEB_SOCKET_DOMAIN = process.env.NEXT_PUBLIC_WEB_SOCKET_DOMAIN;

    if (!WEB_SOCKET_DOMAIN) {
      throw new Error("Web socket domain could not be connected to.");
    }

    const socket = new WebSocket(`${protocol}//${WEB_SOCKET_DOMAIN}`);

    wsRef.current = socket;

    // opening connection to server
    socket.addEventListener("open", (event) => {});

    // set up listening for the path "message"
    socket.addEventListener("message", ({ data }) => {
      console.log("Message from WS server:", data);

      // handle the Game Message type messages which are all Buffers tranfered as a Blob
      if (data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function () {
          const arrayBuffer = reader.result as ArrayBuffer;
          const bufferGameMessage = Buffer.from(arrayBuffer);

          const {
            clientId,
            selectedMessageType,
            selectedActionType,
            selectedActionValue,
          } = decodeMessage(bufferGameMessage);

          console.log("decoded Game Message:", {
            clientId,
            selectedMessageType,
            selectedActionType,
            selectedActionValue,
          });

          // depending on type of message, handle updating the app state
          switch (selectedActionType) {
            case clientsList.CLIENT_LIST: {
              if (isClientInformation(selectedActionValue)) {
                dispatch(setClientInformation(selectedActionValue));
              }
            }
            default: {
              break;
            }
          }
        };

        // read ArrayBuffer with FileReader
        reader.readAsArrayBuffer(data);
      }
    });

    // clean up web socket listening
    return () => {
      console.log("@useWebSocket lifecycle Cleaning up");
      socket.close();
    };
  }, []);

  // return websocket instance
  return { socket: wsRef.current };
};

export default useWebsocket;
