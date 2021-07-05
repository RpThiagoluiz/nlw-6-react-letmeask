import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import logoImg from "../assets/images/logo.svg";
import "../styles/room.scss";

type RoomParms = {
  id: string;
};

export const Room = () => {
  //tipar para ele saber oq vem do params
  const params = useParams<RoomParms>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img
            src={logoImg}
            alt="Nome letmeask, com uma caixinha colorida em volta do ask"
          />
          <RoomCode codeRoom={params.id} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 Perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que vc quer perguntar?" />
          <div className="form-footer">
            <span>
              Para enviar uma pergunta, <button>faca seu login</button>.
            </span>
            <Button type="submit">Enviar Pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
};
