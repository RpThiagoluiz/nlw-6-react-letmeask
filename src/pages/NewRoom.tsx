import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Button } from "../components/Button";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss";

export const NewRoom = () => {
  const [newRoom, setNewRoom] = useState("");

  const { user } = useAuth();
  const { push } = useHistory();

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (newRoom.trim() === "") return;

    //dentro do database referencia do banco de dados, como se estivesse referindo ao banco de ssssdados.

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    push(`/rooms/${firebaseRoom.key}`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewRoom(event.target.value);
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
          <h3>{user?.name}</h3>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da Sala"
              onChange={handleInputChange}
              value={newRoom}
            />
            <Button type="submit">Criar na sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
