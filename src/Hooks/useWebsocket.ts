import { useEffect } from "react";

const useWebsocket = () => {
  useEffect(() => {
    // determine window scheme
    const protocol = window.location.protocol;
    console.log("protocol:", protocol);

    // connect to websocket
    const WEB_SOCKET_DOMAIN = process.env.NEXT_PUBLIC_WEB_SOCKET_DOMAIN;

    console.log("WEB_SOCKET_DOMAIN:", WEB_SOCKET_DOMAIN);

    if (!WEB_SOCKET_DOMAIN) {
      throw new Error("Web socket domain could not be connected to.");
    }

    // const socket = new WebSocket(`${protocol}//${WEB_SOCKET_DOMAIN}`);
    const protocol_static = "ws:";
    const socket = new WebSocket(`${protocol_static}//${WEB_SOCKET_DOMAIN}`);

    // opening connection to server
    socket.addEventListener("open", (event) => {
      socket.send("Hello Server!");
    });

    // set up listening for the path "message"
    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
    });

    // clean up web socket listening
    return () => {
      // socket.close();
    };
  }, []);
};

export default useWebsocket;
