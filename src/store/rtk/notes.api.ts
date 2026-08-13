import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ApiResponse, type NewNotesObject, type Note } from '../../schemas/interface';
import { config } from '../../../config';

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.app.host}/api`,
        credentials: 'include',
    }),
    tagTypes: ['Notes'],
    endpoints: (builder) => ({
        getNotes: builder.query<ApiResponse, void>({
            query: () => '/notes',
            providesTags: ['Notes'],
        }),
        addNote: builder.mutation<ApiResponse, NewNotesObject>({
            query: (newNote) => ({
                url: '/notes',
                method: 'POST',
                body: newNote,
            }),
            invalidatesTags: ['Notes'],
        }),
        updateNote: builder.mutation<ApiResponse, Note>({
            query: (note) => ({
                url: '/notes',
                method: 'PUT',
                body: note,
            }),
            invalidatesTags: ['Notes'],
        }),
        deleteNote: builder.mutation<{ success: boolean; note: Note }, string>({
            query: (id) => ({
                url: `/notes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notes'],
        }),
        toggleShare: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/notes/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Notes'],
        }),
    }),
});

export const {
    useAddNoteMutation,
    useGetNotesQuery,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
    useToggleShareMutation,
} = notesApi;