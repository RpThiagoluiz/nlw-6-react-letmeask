import { ReactNode } from "react";
import "./styles.scss";

type QuestionProps = {
  children: ReactNode;
  question: {
    content: string;
    author: {
      name: string;
      avatar: string;
    };
  };
};

export const Question = ({ question, children }: QuestionProps) => (
  <div className="question">
    <p>{question.content}</p>
    <footer>
      <div className="user-info">
        <img
          src={question.author.avatar}
          alt={`Imagem, url do avatar de quem perguntou - ${question.author.avatar}`}
        />
        <span>{question.author.name}</span>
      </div>
      <div>{children}</div>
    </footer>
  </div>
);
