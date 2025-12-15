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

export default async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<NoteHttpResponse> {
  const response = await axios.get<NoteHttpResponse>('/notes', {
    params: {
      search: query,
      page,
      tag: tag || undefined,
      perPage: 8,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}

export async function createNote({ title, content, tag }: createNotePost): Promise<Note> {
  const postResponse = await axios.post<Note>(
    '/notes',
    { title, content, tag },
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return postResponse.data;
}
export async function deleteNote(id: string): Promise<Note> {
  const deleteResponse = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return deleteResponse.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const responseById = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return responseById.data;
}