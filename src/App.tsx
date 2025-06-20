import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import Catalog from './pages/Catalog';
import Deployments from './pages/Deployments';
import Metrics from './pages/Metrics';
import Settings from './pages/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/deployments" element={<Deployments />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;