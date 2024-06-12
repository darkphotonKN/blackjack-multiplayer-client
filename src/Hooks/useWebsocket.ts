import { useEffect } from "react";

/**
 * Sets up websocket connections and clean up
 */

const useWebsocket = () => {
  useEffect(() => {
    // determine window scheme
    const protocol = window.location.protocol;

    // connect to websocket
    const WEB_SOCKET_DOMAIN = process.env.NEXT_PUBLIC_WEB_SOCKET_DOMAIN;

    if (!WEB_SOCKET_DOMAIN) {
      throw new Error("Web socket domain could not be connected to.");
    }

    const socket = new WebSocket(`${protocol}//${WEB_SOCKET_DOMAIN}`);

    // opening connection to server
    socket.addEventListener("open", (event) => {});

    // set up listening for the path "message"
    socket.addEventListener("message", ({ data }) => {
      try {
        console.log("Message from server ", data);
        // attempt to store the id when first connection to the server

        const message = JSON.parse(data);

        if (message.id) {
          // store id
          console.log("id was:", message.id);
        } else {
          console.log("message:", message);
        }
      } catch (err) {
        console.log("Error when parsing message from server as json:", err);
      }
    });

    // clean up web socket listening
    return () => {
      // socket.close();
    };
  }, []);
};

export default useWebsocket;
