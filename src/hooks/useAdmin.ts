import { useEffect, useState } from "react";
import { database } from "../services/firebase";

export const useAdmin = (roomId: string) => {
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    const roomAuthorRef = database.ref(`rooms/${roomId}/authorId`);
    roomAuthorRef.on("value", (auth) => {
      const author = auth.val();
      setAuthorId(author);
    });

    return () => {
      roomAuthorRef.off("value");
    };
  }, [roomId]);

  return { authorId };
};
