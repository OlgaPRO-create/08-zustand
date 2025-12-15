'use client';

import { useState } from 'react';
import fetchNotes from '../../../../lib/api';
import css from './page.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../../../../components/NoteList/NoteList';
import Pagination from '../../../../components/Pagination/Pagination';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

export default function NotesClient({ tag }: { tag?: string }) {
  const [inputValue, setInputValue] = useState("");
  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(1);

  const debounceSearch = useDebouncedCallback((value: string) => {
    setSearchWord(value);
    setPage(1);
  }, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debounceSearch(value);
  };

  const { data } = useQuery({
    queryKey: ['myNoteHubKey', searchWord, page, tag],
    queryFn: () => fetchNotes(searchWord, page, tag),
    placeholderData: keepPreviousData,
  });


  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        {<SearchBox value={inputValue} onChange={handleChange} />}
        {data && data?.notes.length > 0 && (
          <Pagination
            totalPages={data?.totalPages}
            page={page}
            onPageChange={newPage => setPage(newPage)}
          />
        )}
        
          <Link className={css.button} href="/notes/action/create">
            Create note +
          </Link>
        
      </div>
      {data && data?.notes.length > 0 && <NoteList notes={data?.notes} />}
    </div>
  );
}