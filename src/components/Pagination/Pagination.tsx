import { memo } from 'react';
import PageButton from './PageButton';
import { cn } from '@/lib/utils';
import Arrow from '@/lib/icons/arrow-left.svg';
import { getPaginationRange } from './utils';
import useMediaQuery from '@/lib/hooks/useMediaQuery';

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

  if (totalPages < 2) return null;

  const pageRange = getPaginationRange(
    page,
    totalPages,
    isPhone ? 0 : isTablet ? 1 : siblingCount,
    gapLabel
  );

  return (
    <nav className={cn(className)} data-testid="pagination">
      <ul className="flex justify-center">
        <PageButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="text-gray-700"
          aria-label="Previous page"
        >
          <Arrow />
        </PageButton>
        {pageRange.map((item) => (
          <PageButton
            key={Math.random()}
            onClick={item === gapLabel ? () => null : () => onPageChange(item as number)}
            active={page === item}
            aria-label={item === gapLabel ? undefined : `Page ${item}`}
          >
            {item}
          </PageButton>
        ))}
        <PageButton
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <Arrow className="rotate-180" />
        </PageButton>
      </ul>
    </nav>
  );
};

export default memo(Pagination);
