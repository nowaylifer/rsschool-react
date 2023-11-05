import { memo } from 'react';
import PageLink from './PageLink';
import { cn } from '../../utils';
import Arrow from '../../assets/icons/arrow-left.svg?react';
import { getPaginationRange } from './utils';

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
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 2) return null;

  const pageRange = getPaginationRange(page, totalPages, siblingCount, gapLabel);

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
            to={typeof item === 'string' ? composePageURL(page) : composePageURL(item)}
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
