import { memo } from 'react';
import PageLink from './PageLink';
import { cn } from '../../utils';
import Arrow from '../../assets/icons/arrow-left.svg?react';
import { getPaginationRange } from './utils';
import useMediaQuery from '../../hooks/useMediaQuery';

interface Props {
  getURLForPage(page: number): string;
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
  getURLForPage,
  siblingCount = 2,
  className,
  gapLabel = '...',
}: Props) => {
  const isTablet = useMediaQuery('(max-width: 768px)');
  const isPhone = useMediaQuery('(max-width: 430px)');

  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 2) return null;

  const pageRange = getPaginationRange(
    page,
    totalPages,
    isPhone ? 0 : isTablet ? 1 : siblingCount,
    gapLabel
  );

  const composePageURL = (toPage: number) => {
    return toPage >= 1 && toPage <= totalPages ? getURLForPage(toPage) : '';
  };

  return (
    <nav className={cn(className)}>
      <ul className="flex justify-center">
        <PageLink to={composePageURL(page - 1)} disabled={page === 1} className="text-gray-700">
          <Arrow />
        </PageLink>
        {pageRange.map((item) => (
          <PageLink
            key={Math.random()}
            to={item === gapLabel ? composePageURL(page) : composePageURL(item as number)}
            active={page === item}
          >
            {item}
          </PageLink>
        ))}
        <PageLink to={composePageURL(page + 1)} disabled={page === totalPages}>
          <Arrow className="rotate-180" />
        </PageLink>
      </ul>
    </nav>
  );
};

export default memo(Pagination);
