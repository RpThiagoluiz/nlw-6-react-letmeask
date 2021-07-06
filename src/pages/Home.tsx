import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";
import { LoadingSpinner } from "../components/LoadingSpinner";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImage from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import { database } from "../services/firebase";

export const Home = () => {
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useHistory();
  const { handleSingInWithGoogle, user } = useAuth();

  //When button send user to other page
  const handleCreateRoom = async () => {
    //No user, function disparity
    if (!user) {
      await handleSingInWithGoogle();
    }

    push("/rooms/new");
  };

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (room.trim() === "") {
      setIsLoading(false);
      return;
    }

    //Vem da doc do firebase - buscar tudo que tem dentro,
    const roomRef = await database.ref(`rooms/${room}`).get();

    if (!roomRef.exists()) {
      setIsLoading(false);
      alert(`room does not exists`);
      return;
    }

    if (roomRef.val().endedAt) {
      setIsLoading(false);
      alert("Room Encerrada");
      return;
    }

    setIsLoading(false);
    push(`/rooms/${room}`);
  };

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Illustracao demonstrando perguntas e respostas."
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img
            src={logoImg}
            alt="Nome letmeask, com uma caixinha colorida em volta do ask. "
          />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImage} alt="Logo da google" />
            Criei sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={(e) => setRoom(e.target.value)}
              value={room}
            />

            <Button type="submit">
              {isLoading ? <LoadingSpinner /> : `Entrar na Sala`}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};
