import { ChangeEvent, FC, FormEvent, useState } from "react";

type SearchFormProps = {
    search: (searchText: string) => void;
    resetSearch: () => void;
};

export const SearchForm: FC<SearchFormProps> = ({ search, resetSearch }) => {
    const [searchVal, setSearchValue] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ searchVal });
        search(searchVal);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={searchVal}
                onChange={handleChange}
                placeholder="Search products"
            />
            <button>Submit</button>
            <button type="button" onClick={resetSearch}>
                Close search
            </button>
        </form>
    );
};
