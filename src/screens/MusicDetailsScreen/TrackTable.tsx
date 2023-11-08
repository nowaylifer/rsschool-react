import Card from '../../components/Card';
import Clock from '../../assets/icons/clock.svg?react';
import TrackRow from './TrackRow';
import { SimplifiedTrack } from '../../types';
import { ComponentProps } from 'react';
import { cn } from '../../utils';

interface Props extends ComponentProps<'table'> {
  tracks: SimplifiedTrack[];
}

const TrackTable = ({ tracks, className }: Props) => {
  return (
    <Card className={cn(className)}>
      <table className="w-full">
        <thead className="border-slate-150 border-b">
          <tr>
            <th colSpan={2} className="pb-2 pl-6 text-left text-lg">
              Track
            </th>
            <th className="pb-2">
              <Clock />
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <TrackRow orderNum={index + 1} track={track} key={track.id} />
          ))}
        </tbody>
      </table>
    </Card>
  );
};
export default TrackTable;
