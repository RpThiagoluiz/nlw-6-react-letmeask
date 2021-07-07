import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { useRoom } from "../hooks/useRoom";
import { NotAdmin } from "./NotAdmin";
import { Button } from "../components/Button";
import { Question as QuestionComponent } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import logoImg from "../assets/images/logo.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import deleteImg from "../assets/images/delete.svg";
import "../styles/room.scss";
import { useAdmin } from "../hooks/useAdmin";

type RoomParms = {
  id: string;
};

//Record e para demonstar um obj, que tenha uma chave, depois outro obj dentro.

export const AdminRoom = () => {
  //tipar para ele saber oq vem do params
  const params = useParams<RoomParms>();
  const roomId = params.id;

  const { push } = useHistory();

  const { questions, title } = useRoom(roomId);
  const { user } = useAuth();
  const { authorId } = useAdmin(roomId);

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    push("/");
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Tem certeza q vc deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  };

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };

  const handleCheckQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  };

  if (user?.id !== authorId) return <NotAdmin />;

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img
            src={logoImg}
            alt="Nome letmeask, com uma caixinha colorida em volta do ask"
          />
          <div className="button-finish">
            <RoomCode codeRoom={roomId} />
            {/* Nao precisa falar que o isOutlined sera true, so de passar ele ja intende. */}
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala - {title}</h1>
          {questions.length > 0 && (
            <span>
              {questions.length}{" "}
              {questions.length === 1 ? "Pergunta" : "Perguntas"}
            </span>
          )}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <QuestionComponent key={question.id} question={question}>
              {/* !question.isAnswered -< Just verify that is true or false. */}
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestion(question.id)}
                  >
                    <img
                      src={checkImg}
                      alt="icone de um v, utilizada para marcar como respondida a pergunta"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img
                      src={answerImg}
                      alt="icone de uma balao de dialogo, utilizada para destacar aquele pergunta"
                    />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img
                  src={deleteImg}
                  alt="icone de uma lixeira, utilizada para remover a pergunta"
                />
              </button>
            </QuestionComponent>
          ))}
        </div>
      </main>
    </div>
  );
};
