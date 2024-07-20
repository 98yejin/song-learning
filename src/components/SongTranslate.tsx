import { SongActionProps } from "../types/song";

const SongTranslate: React.FC<SongActionProps> = (props: SongActionProps) => {
  return <div>translate {props.lyric.english}</div>;
};

export default SongTranslate;
