//libs
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//components
import { Router } from 'components/router/router';
import { AuthProvider } from 'context/auth';
//helpers
import { getIsMobile } from 'helpers/common';

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="bottom-center"
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
      <DndProvider backend={getIsMobile() ? TouchBackend : HTML5Backend}>
        <Router />
      </DndProvider>
    </AuthProvider>
  );
}

export default App;
