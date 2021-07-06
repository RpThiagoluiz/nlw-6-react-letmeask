import { createContext, useState, useEffect } from "react";
import { firebase, auth } from "../services/firebase";

interface userProps {
  id: string;
  name: string;
  avatar: string;
}

type authContextType = {
  user: userProps | undefined;
  handleSingInWithGoogle: () => Promise<void>;
};

type authContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as authContextType);

export const AuthContextProvider = ({ children }: authContextProviderProps) => {
  //como meu usuario nao tem conteudo, ele fica como undefined, e assim ele seta o estado inicial como false
  const [user, setUser] = useState<userProps>();

  useEffect(() => {
    //firebase, monitarar se ja existe um usuario logado nessa aplicacao.
    //vc precisa limpar o timeout async dele
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      //nao da erro para sair de tela.
      unsubscribe();
    };
  }, []);

  const handleSingInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    //Login Google in popUp, for ux
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }

    //Pormise - create
    // auth.signInWithPopup(provider).then((result) => {
    //   if (result.user) {
    //     const { displayName, photoURL, uid } = result.user;

    //     if (!displayName || !photoURL) {
    //       throw new Error("Missing information from google Account.");
    //     }

    //     setUser({
    //       id: uid,
    //       name: displayName,
    //       avatar: photoURL,
    //     });
    //   }
    // });
  };

  return (
    <AuthContext.Provider value={{ user, handleSingInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
