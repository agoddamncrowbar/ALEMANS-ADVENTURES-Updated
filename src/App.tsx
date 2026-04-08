import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, Suspense } from 'react';
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Development: no caching, always fresh
      // Production: 7-day cache
      staleTime: 0,
      gcTime: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
      // Add this for better dev experience
      retry: 3,
    },
  },
})




// Lazy load non-critical pages
const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const DocumentPage = lazy(() => import('./pages/DocumentPage'));
const Contact = lazy(() => import('./pages/Contact'));
const Destinations = lazy(() => import('./pages/Destinations'));
const Kenya = lazy(() => import('./pages/Destinations/kenya/index'));
const Tanzania = lazy(() => import('./pages/Destinations/Tanzania'));
const Uganda = lazy(() => import('./pages/Destinations/Uganda'));
const Rwanda = lazy(() => import('./pages/Destinations/Rwanda'));
const Zanzibar = lazy(() => import('./pages/Destinations/Zanzibar'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const JournalsPage = lazy(() => import('./pages/Journals/index'));
const JournalDetail = lazy(() => import('./pages/Journals/JournalDetail'));
const ReviewsPage = lazy(() => import('./pages/Reviews/index'));
const BookingPage = lazy(() => import('./pages/booking/BookingPage'));

// Admin pages (already protected)
const AdminUploadsPage = lazy(() => import('./pages/Admin/adminUploads/AdminUpload'));
const AdminIndexPage = lazy(() => import('./pages/Admin/Index'));
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminJournalPage = lazy(() => import('./pages/Admin/Journals/JournalPage'));
const AdminReviewsPage = lazy(() => import('./pages/Admin/ReviewPage'));
const AdminSafarisPage = lazy(() => import('./pages/Admin/Safaris'));
const UpdateSocials = lazy(() => import('./pages/Admin/UpdateSocials'));
const Bookings = lazy(() => import('./pages/Admin/booking/Booking'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5D547]"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path='/destinations' element={<Destinations/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path="/search" element={<SearchResults />} />
            <Route path="/journals" element={<JournalsPage />} />
            <Route path="/journals/:id" element={<JournalDetail />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/:section/:footerName" element={<DocumentPage />} />
            <Route path='/destinations/kenya/*' element={<Kenya/>}/>
            <Route path='/destinations/tanzania/*' element={<Tanzania />}/>
            <Route path='/destinations/uganda/*' element={<Uganda />}/>
            <Route path='/destinations/rwanda/*' element={<Rwanda />}/>
            <Route path='/destinations/zanzibar/*' element={<Zanzibar />}/>
            <Route path='/admin' element={<ProtectedRoute><AdminIndexPage/></ProtectedRoute>}/>
            <Route path='/admin/uploads' element={<ProtectedRoute><AdminUploadsPage/></ProtectedRoute>}/>
            <Route path='/admin/login' element={<AdminLogin/>}/>
            <Route path='/admin/journal' element={<ProtectedRoute><AdminJournalPage/></ProtectedRoute>}/>
            <Route path='/admin/reviews' element={<ProtectedRoute><AdminReviewsPage/></ProtectedRoute>}/>
            <Route path="/admin/bookings" element={<ProtectedRoute><Bookings/></ProtectedRoute>}/>
            <Route path="/admin/safaris" element={<ProtectedRoute><AdminSafarisPage/></ProtectedRoute>}/>
            <Route path="/admin/socials" element={<ProtectedRoute><UpdateSocials/></ProtectedRoute>}/>
          </Routes>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App