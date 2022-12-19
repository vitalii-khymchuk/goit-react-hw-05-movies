import { AiOutlineSearch } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';
import { SearchbarWrap, Form, Input, SearchBtn } from './Searchbar.styled';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') ?? '';

  const onInputChange = e => {
    const searchQuery = e.currentTarget.value;
    const nextParam = searchQuery !== '' ? { query: searchQuery } : {};
    setSearchParams(nextParam);
  };

  const onSearchBtnClick = e => {
    e.preventDefault();
    const formattedQuery = queryParam.trim().toLowerCase();
    if (formattedQuery) {
      onSubmit(formattedQuery);
    } else {
      toast('Enter something');
    }
  };

  return (
    <SearchbarWrap>
      <Form>
        <SearchBtn type="submit" onClick={onSearchBtnClick}>
          <AiOutlineSearch size="20" />
        </SearchBtn>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          maxLength="20"
          value={queryParam}
          onChange={onInputChange}
        />
      </Form>
    </SearchbarWrap>
  );
}
