import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './store/store';
import { fetchCardsData } from './store/cards-actions';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
// import CardPage from './pages/Card';
import CardsPage from './pages/Cards';
import NewCardPage from './pages/NewCard';
import EditCardPage from './pages/EditCard';
import ErrorPage from './pages/Error';
import TrainingModePage from './pages/TrainingMode';
// import LogInPage from './pages/Login';
// import SignUpPage from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <ErrorPage />, children: [
      { index: true, element: <HomePage /> },
      { path: 'train', element: <TrainingModePage /> },
      { path: 'cards', element: <CardsPage /> },
      { path: 'cards/new', element: <NewCardPage /> },
      // { path: 'cards/:cardId', element: <CardPage /> },
      { path: 'cards/:cardId/edit', element: <EditCardPage /> }
    ]
  }
]);


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCardsData());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
