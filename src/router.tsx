import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import BudgetsPage from './pages/BudgetsPage';
import LineItemsPage from './pages/LineItemsPage';
import SettingsPage from './pages/SettingsPage';
import BudgetDetailPage from './pages/BudgetDetailPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'budgets',
        element: <BudgetsPage />,
      },
      {
        path: 'budget/:budgetId',
        element: <BudgetDetailPage />,
      },
      {
        path: 'line-items',
        element: <LineItemsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
