import { Router } from 'components/router/router';
import { AuthProvider } from 'context/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

function App() {
  const isMobileBrowser =
    navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i);

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
      <DndProvider backend={isMobileBrowser ? TouchBackend : HTML5Backend}>
        <Router />
      </DndProvider>
    </AuthProvider>
  );
}

export default App;
