import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setClientId } from "../state/slices/clientSlice";

/**
 * Sets up websocket connections and clean up
 */

const useWebsocket = () => {
  // persist websocket instance across re-renders
  const wsRef = useRef<WebSocket | null>();
  const dispatch = useDispatch();

  useEffect(() => {
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
      try {
        console.log("Message from server ", data);
        // attempt to store the id when first connection to the server

        const message = JSON.parse(data);

        const { id } = message;
        if (id) {
          // store id
          dispatch(setClientId(id));

          console.log("id was:", id);
        } else {
          // get string from the message instead if id didn't exist
          const jsonStringMsg = Buffer.from(data).toString("utf-8");

          console.log("jsonStringMsg:", jsonStringMsg);
        }
      } catch (err) {
        console.log("Error when parsing message from server as json:", err);
      }
    });

    // clean up web socket listening
    return () => {
      socket.close();
    };
  }, []);

  // return websocket instance
  return { socket: wsRef };
};

export default useWebsocket;
