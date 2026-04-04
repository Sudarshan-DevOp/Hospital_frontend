import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AboutPage } from './pages/AboutPage'
import { FacilitiesServicesPage } from './pages/FacilitiesServicesPage'
import { CareersPage } from './pages/CareersPage'
import { PatientsVisitorsPage } from './pages/PatientsVisitorsPage'
import { ContactPage } from './pages/ContactPage'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { PortfolioPage } from './pages/PortfolioPage'
import { Toaster } from 'sonner'

import { PatientDashboard } from './pages/patient/PatientDashboard'
import { UserProfile } from './pages/patient/UserProfile'
import { AppointmentsPage } from './pages/patient/AppointmentsPage'
import { DocumentsPage } from './pages/patient/DocumentsPage'
import { HealthRecordsPage } from './pages/patient/HealthRecordsPage'
import { BookAppointmentPage } from './pages/patient/BookAppointmentPage'

import { DoctorDashboard } from './pages/doctor/DoctorDashboard'
import { DoctorSidebar } from './components/DoctorSidebar'
import { DoctorsListPage } from './pages/DoctorsListPage'

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
        <ConditionalLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/facilities-services" element={<FacilitiesServicesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/patients-visitors" element={<PatientsVisitorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/doctors" element={<DoctorsListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/profile" element={<UserProfile />} />
            <Route path="/patient/appointments" element={<AppointmentsPage />} />
            <Route path="/patient/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/patient/documents" element={<DocumentsPage />} />
            <Route path="/patient/health-records" element={<HealthRecordsPage />} />

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          </Routes>
        </ConditionalLayout>
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  )
}

import { PatientSidebar } from './components/PatientSidebar'

const ConditionalLayout = ({ children }) => {
  const location = useLocation()
  const isPatientRoute = location.pathname.startsWith('/patient/')
  const isDoctorRoute = location.pathname.startsWith('/doctor/')
  const isAuthRoute = ['/login', '/register', '/portfolio'].includes(location.pathname)

  if (isPatientRoute || isDoctorRoute) {
    return (
      <div className="flex bg-gray-50/50 min-h-screen">
        {isPatientRoute ? <PatientSidebar /> : <DoctorSidebar />}
        <main className="flex-1 w-full overflow-y-auto">
          {children}
        </main>
      </div>
    )
  }

  return (
    <>
      {!isAuthRoute && <Navbar />}
      {children}
      {!isAuthRoute && <Footer />}
    </>
  )
}

export default App
