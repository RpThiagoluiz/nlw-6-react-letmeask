import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImage from "../assets/images/google-icon.svg";
import "../styles/auth.scss";

export const Home = () => {
  const { push } = useHistory();
  const { handleSingInWithGoogle, user } = useAuth();

  //When button send user to other page
  const handleCreateRoom = async () => {
    if (!user) {
      await handleSingInWithGoogle();
    }

    push("/rooms/new");
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
          <form>
            <input type="text" placeholder="Digite o codigo da sala" />
            <Button type="submit">
              <a href="/nemtem">Entrar na sala</a>
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};
