export function getPaginationRange(current: number, total: number, delta: number, gap: string) {
  if (total <= 1) return [1];

  const center = [current] as (number | typeof gap)[];

  for (let i = 1; i <= delta; i++) {
    center.unshift(current - i);
    center.push(current + i);
  }

  const filteredCenter = center.filter(
    (page) => typeof page === 'number' && page > 1 && page < total
  );

  const includeLeftGap = current > 3 + delta;
  const includeLeftPages = current === 3 + delta;
  const includeRightGap = current < total - (2 + delta);
  const includeRightPages = current === total - (2 + delta);

  if (includeLeftPages) filteredCenter.unshift(2);
  if (includeRightPages) filteredCenter.push(total - 1);
  if (includeLeftGap) filteredCenter.unshift(gap);
  if (includeRightGap) filteredCenter.push(gap);

  return [1, ...filteredCenter, total];
}
