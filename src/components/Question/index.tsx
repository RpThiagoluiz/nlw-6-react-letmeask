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
    isHighlighted?: boolean;
    isAnswered?: boolean;
  };
};

export const Question = ({
  question,
  question: { isAnswered = false, isHighlighted = false },
  children,
}: QuestionProps) => (
  <div
    className={`question ${isAnswered && "answered"} ${
      isHighlighted && !isAnswered ? "highlighted" : ""
    }`}
  >
    <p>{question.content}</p>
    <footer>
      <div className="user-info">
        <img
          src={question.author.avatar}
          alt={`Imagem, url do avatar de quem perguntou - ${question.author.avatar}`}
        />
        <span>{question.author.name}</span>
      </div>
      <div className="content-actions">{children}</div>
    </footer>
  </div>
);
