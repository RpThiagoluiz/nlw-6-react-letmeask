import copyImg from "../../assets/images/copy.svg";
import "./styles.scss";

type Props = {
  codeRoom: string;
};

export const RoomCode = ({ codeRoom }: Props) => {
  const copyRoomCodeToClipBoar = () => {
    navigator.clipboard.writeText(codeRoom);
  };

  return (
    <button className="room-code" onClick={copyRoomCodeToClipBoar}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{codeRoom}</span>
    </button>
  );
};
