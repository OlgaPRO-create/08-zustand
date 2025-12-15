import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createNotePost } from "../api";

type NoteDraftStore = {
    draft: createNotePost;
    setDraft: (note: createNotePost) => void;
    clearDraft: () => void;
};
const initialDraft: createNotePost = {
    title: "",
    content: "",
    tag: "Todo",
};
export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) => set(() => ({ draft: note })),
            clearDraft: () => set(() => ({ draft: initialDraft })),
        }),
        {
            name: "note-draft",
            partialize: (state) => ({ draft: state.draft }),
        },
    ),
);