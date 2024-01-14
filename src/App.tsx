import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from 'context/auth';

import { Router } from 'components/router/router';
import { getIsMobile } from 'helpers/common';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-left"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <DndProvider
        backend={getIsMobile() ? TouchBackend : HTML5Backend}
        options={{ delayTouchStart: getIsMobile() ? 400 : 0 }}
      >
        <Router />
      </DndProvider>
    </AuthProvider>
  );
}

export default App;
