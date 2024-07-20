import { SongActionProps } from "../types/song";

const SongCopy: React.FC<SongActionProps> = (props: SongActionProps) => {
  return <div>copy {props.lyric.english}</div>;
};

export default SongCopy;
