import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export interface createNotePost {
  title: string;
  content: string;
  tag: NoteTag;
}
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';



// export default async function fetchNotes(
//   query: string,
//   page: number,
//   tag?: string
// ): Promise<NoteHttpResponse> {
//   const response = await axios.get<NoteHttpResponse>('/notes', {
//     params: {
//       search: query,
//       page,
//       tag: tag || undefined,
//       perPage: 8,
//     },
//     headers: {
//       accept: 'application/json',
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//     },
//   });
//   return response.data;
// }

// export async function createNote({ title, content, tag }: createNotePost): Promise<Note> {

export default async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<NoteHttpResponse> {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: string;
  } = {
    page,
    perPage: 8,
  };


  if (query.trim() !== '') {
    params.search = query;
  }

  if (tag && tag !== 'all') {
    params.tag = tag;
  }
 
const response = await axios.get<NoteHttpResponse>('/notes', {
   params,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
});
  
  return response.data;
}


export async function createNote({
  title,
  content,
  tag,
}: createNotePost): Promise<Note> {
  const response = await axios.post<Note>(
    '/notes',
    { title, content, tag },
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}


