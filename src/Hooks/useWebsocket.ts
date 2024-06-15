import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setClientId, setClients } from "../state/slices/clientSlice";

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
      try {
        console.log("Message from server ", data);
        // check if data is a Blob
        if (data instanceof Blob) {
          // instantiate file reader
          const reader = new FileReader();

          // use it to read the array buffer
          reader.readAsText(data);

          reader.onloadend = () => {
            // handle the data after loaded
            const { result } = reader;

            const jsonRes = JSON.parse(result as string);
            const arrayRes = Object.entries(jsonRes) as [string, string][];

            console.log("Blob data:", result);
            console.log("Blob data JSON:", jsonRes);
            console.log("Blob data array:", arrayRes);

            dispatch(setClients(arrayRes));
          };
        } else {
          // attempt to store the id when first connection to the server
          const message = JSON.parse(data); // only parse when data is not a blob

          const { id } = message;
          if (id) {
            // store id
            dispatch(setClientId(id));

            console.log("id was:", id);
          }
        }
      } catch (err) {
        console.log("Error when parsing message from server as json:", err);
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
