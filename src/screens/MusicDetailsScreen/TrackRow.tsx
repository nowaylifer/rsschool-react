import { SimplifiedTrack } from '../../types';

interface Props {
  track: SimplifiedTrack;
  orderNum: number;
}

const TrackRow = ({ track, orderNum }: Props) => {
  return (
    <tr>
      <td className="py-2">{orderNum}.</td>
      <td>{track.title_short}</td>
      <td>{track.duration}</td>
    </tr>
  );
};
export default TrackRow;
