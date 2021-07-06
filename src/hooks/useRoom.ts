import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type Question = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type FireBaseQuestions = Record<
  string,
  {
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
    likeId: string | undefined;
  }
>;

export const useRoom = (roomId: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    //Doc do firebase - apenas uma vez colocar on, duas vc coloca once
    // firebase devolve ele como obj nao array.
    //Bom trocar o on change por outra coisa.
    roomRef.on("value", (room) => {
      //Tipar ele - For of seria melhor
      const databaseRoom = room.val();
      const firebaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestion = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          //value => { value[0] ,value[1]...}
          const { author, content, isAnswered, isHighlighted } = value;
          return {
            id: key,
            content,
            author,
            isAnswered,
            isHighlighted,
            likeCount: Object.values(value.likes ?? {}).length,
            //Find retornar o obj encontrado, o some vai retornar true or false
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0], //verificar se nao retornou nda, vai retornar null, se se sim ele acessa a possicao zero
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestion);
    });

    //limpar os eventListeners
    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  return { questions, title };
};
