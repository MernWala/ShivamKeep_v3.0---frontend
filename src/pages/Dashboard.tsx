import { useGetNotesQuery } from '../store/rtk/notes.api';
import { NoteCard } from '../components/NoteCard';
import React, { useState } from 'react';
import Header from '../components/Header';
import { FiPlus } from 'react-icons/fi';
import { NoteCreateUpdateModal } from '../components/Modals';

export function Dashboard() {
  const { data, isLoading } = useGetNotesQuery();

  const [createNoteModal, setCreateNoteModal] = useState<boolean>(false);
  const toggleAddNoteModal = () => setCreateNoteModal(!createNoteModal);

  return (
    <React.Fragment>
      <Header />
      {isLoading ?
        "Loading Note... <Dashboard.tsx>"
        :
        <React.Fragment>
          <NoteCreateUpdateModal action={'create'} show={createNoteModal} setShow={setCreateNoteModal} key={"Create Note Modal"} />
          <div className='bg-neutral-100 min-h-[85.2vh] relative'>
            <div className='fixed bottom-0 right-0 m-5 z-[2] rounded-full bg-indigo-900 overflow-hidden shadow-md shadow-gray-700' onClick={toggleAddNoteModal}>
              <button type="button" className='outline-none p-2 text-white lh-1 text-xl hover:text-3xl transition-all'>
                <div className='border-2 border-white rounded-full p-5 flex items-center justify-center relative'>
                  <FiPlus className='absolute' />
                </div>
              </button>
            </div>

            <div className='md:px-3 md:py-5 p-3'>
              <div className={`flex flex-wrap ${data?.data?.notes && data?.data?.notes?.length > 0 && data?.data?.notes?.length < 3 ? 'justify-start' : 'justify-center'}`}>
                {[...(data?.data?.notes ?? [])]
                  ?.sort((n1, n2) => new Date(n2?.createdAt ?? "").getTime() - new Date(n1?.createdAt ?? "").getTime())
                  ?.map((note) => (
                    <NoteCard
                      _id={note._id}
                      key={note._id}
                      title={note.title}
                      notes={note.notes}
                      tags={note.tags}
                      shared={note.shared}
                      sharedMode={false}
                      createdAt={note.createdAt}
                      updatedAt={note.updatedAt}
                    />
                  ))
                }

                {data?.data?.notes?.length === 0 &&
                  <div className='min-h-96 flex items-center'>
                    <span className='text-indigo-700 capitalize block text-center'>No notes available! Try to add some by clicking right bottom button</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </React.Fragment>
      }
    </React.Fragment>
  );
}