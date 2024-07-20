import { SongActionProps } from "../types/song";

const SongArrange: React.FC<SongActionProps> = (props: SongActionProps) => {
  return <div>arrange {props.lyric.english}</div>;
};

export default SongArrange;
