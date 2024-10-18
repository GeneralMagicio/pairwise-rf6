import { Search } from '@/public/assets/icon-components/Search';

type TSearchBarProps = {
  search: string
  setSearch: (search: string) => void
};

const SearchBar = ({ search, setSearch }: TSearchBarProps) => {
  return (
    <div className="relative flex w-full items-center gap-4 rounded-md border border-gray-200 px-4 py-2 placeholder:text-gray-400 focus:outline-none">
      <Search />
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search projects..."
        className="w-full focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
