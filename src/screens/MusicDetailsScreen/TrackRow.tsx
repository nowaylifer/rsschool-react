import { SimplifiedTrack } from '../../types';
import { toHHMMSS } from '../../utils';

interface Props {
  track: SimplifiedTrack;
  orderNum: number;
}

const TrackRow = ({ track, orderNum }: Props) => {
  return (
    <tr>
      <td className="w-8 py-2">{orderNum}.</td>
      <td>{track.title_short}</td>
      <td>{toHHMMSS(track.duration)}</td>
    </tr>
  );
};
export default TrackRow;
