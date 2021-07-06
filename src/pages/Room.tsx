import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import logoImg from "../assets/images/logo.svg";
import "../styles/room.scss";

type RoomParms = {
  id: string;
};

//Record e para demonstar um obj, que tenha uma chave, depois outro obj dentro.
type FireBaseQuestions = Record<
  string,
  {
    content: string;
    author: {
      name: string;
      avater: string;
    };
    isHighlighted: boolean;
    isAnswered: boolean;
  }
>;

type Questions = {
  id: string;
  content: string;
  author: {
    name: string;
    avater: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
};

export const Room = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [question, setQuestion] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");
  const { user } = useAuth();
  //tipar para ele saber oq vem do params
  const params = useParams<RoomParms>();
  const roomId = params.id;

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
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestion(parsedQuestion);
    });
  }, [roomId]);

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();
    if (newQuestion.trim() === "") return;
    if (!user) throw new Error("You must be logged in");

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avater: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };
    //Firebase
    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion("");
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img
            src={logoImg}
            alt="Nome letmeask, com uma caixinha colorida em volta do ask"
          />
          <RoomCode codeRoom={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala - {title}</h1>
          {question.length > 0 && (
            <span>
              {question.length}{" "}
              {question.length === 1 ? "Pergunta" : "Perguntas"}
            </span>
          )}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que vc quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt="Sua imagem do google" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faca seu login</button>
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar Pergunta
            </Button>
          </div>
        </form>
        {JSON.stringify(question)}
      </main>
    </div>
  );
};
