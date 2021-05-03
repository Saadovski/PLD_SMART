import { createContext } from "react";

export const SocketContext = createContext({
  socket: null,
  idSession: null,
  group: null,
  groudId: null,
});
