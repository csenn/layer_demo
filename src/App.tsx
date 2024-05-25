
import { Box, Paper } from '@mui/material';
import './App.css';
import { NotePage } from './notePage/NotePage';
import { FilterPanel } from './filterPanel/FilterPanel';
import { useState } from 'react';
import { INote } from './types';
import { IFilterOptions } from './filterPanel/filterNotes';


/*
Usually we would want to use something like React Router at
this layer, however to keep it simple we will just use App as 
a page controller component. We would also want to consider using a state
management library like Redux or Zustand to manage the state of the app,
however for this simple example we will just use React state.
*/
function App() {

  const [filteredNotes, setFilteredNotes] = useState<INote[]>([])
  const [noteFilter, setNoteFilter] = useState<string | undefined>()
  const [pageNumber, setPageNumber] = useState<number>(0)

  const resetPagination = () => setPageNumber(0)

  return (
    <Box sx={{
      height: '100vh',
      width: '100vw',
      display: 'flex'
    }}>
      <Box  sx={{
        height: '100vh',
        width: '350px',
        minWidth: '350px',
        border: '1px solid rgb(230,230,230)'
      }}>
        <FilterPanel 
          updateFilteredNotes={setFilteredNotes}
          updateNoteFilter={setNoteFilter}
          resetPagination={resetPagination}
        />
      </Box>
      <Box sx={{
          height: '100vh',
          background: 'rgb(250,250,250)',
          flexGrow: 1,
      }}>
        <NotePage
          filteredNotes={filteredNotes}
          noteFilter={noteFilter}
          pageNumber={pageNumber}
          updatePageNumber={setPageNumber}
        />
      </Box>
    </Box>
  );
}

export default App;
