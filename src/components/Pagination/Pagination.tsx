import { memo } from 'react';
import PageButton from './PageButton';
import { cn } from '../../utils';
import Arrow from '../../assets/icons/arrow-left.svg?react';
import { getPaginationRange } from './utils';
import useMediaQuery from '../../hooks/useMediaQuery';

interface Props {
  onPageChange(page: number): void;
  page: number;
  pageSize: number;
  totalItems: number;
  siblingCount?: number;
  className?: string;
  gapLabel?: string;
}

const Pagination = ({
  pageSize,
  page,
  totalItems,
  onPageChange,
  siblingCount = 2,
  className,
  gapLabel = '...',
}: Props) => {
  const isTablet = useMediaQuery('(max-width: 768px)');
  const isPhone = useMediaQuery('(max-width: 430px)');

  const totalPages = Math.ceil(totalItems / pageSize);

  // if (totalPages < 2) return null;

  const pageRange = getPaginationRange(
    page,
    totalPages,
    isPhone ? 0 : isTablet ? 1 : siblingCount,
    gapLabel
  );

  return (
    <nav className={cn(className)}>
      <ul className="flex justify-center">
        <PageButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="text-gray-700"
        >
          <Arrow />
        </PageButton>
        {pageRange.map((item) => (
          <PageButton
            key={Math.random()}
            onClick={item === gapLabel ? () => null : () => onPageChange(item as number)}
            active={page === item}
          >
            {item}
          </PageButton>
        ))}
        <PageButton onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          <Arrow className="rotate-180" />
        </PageButton>
      </ul>
    </nav>
  );
};

export default memo(Pagination);
