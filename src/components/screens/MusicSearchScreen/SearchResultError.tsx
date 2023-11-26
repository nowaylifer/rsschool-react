import MagnifyingGlass from '@/lib/icons/magnifying-glass.svg';

interface Props {
  error: { message: string };
}

const SearchResultError = ({ error }: Props) => (
  <div className="flex flex-col items-center justify-center gap-4">
    <MagnifyingGlass className="h-14 fill-slate-500" />
    <p className="text-xl font-semibold text-slate-600">{error.message}</p>
  </div>
);

export default SearchResultError;
