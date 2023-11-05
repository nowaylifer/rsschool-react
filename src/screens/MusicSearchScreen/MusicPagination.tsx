import { ComponentProps, memo } from 'react';
import { Pagination, PageSizeSelect } from '../../components/Pagination';
import { cn } from '../../utils';

interface Props extends ComponentProps<typeof Pagination>, ComponentProps<typeof PageSizeSelect> {}

const MusicPagination = (props: Props) => {
  const { onChange, currentSize, sizes, className, ...paginationProps } = props;

  if (!paginationProps.totalItems) return null;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-x-2 gap-y-4 md:flex-row',
        className
      )}
    >
      <Pagination {...paginationProps} />
      <PageSizeSelect onChange={onChange} currentSize={currentSize} sizes={sizes} />
    </div>
  );
};
export default memo(MusicPagination);
