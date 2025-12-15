import { fetchNoteById } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotePreview from './NotePreview.client';

type Props = {
  params: { id: string };
};
const NoteDatails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      < NotePreview />
    </HydrationBoundary>
  );
};

export default NoteDatails;