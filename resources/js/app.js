import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";
import Home from './views/User-View/pages/Home/Home';
import About from './views/User-View/pages/About/About';
import Companies from './views/User-View/pages/Companies/Companies';
import CompaniesDetail from './views/User-View/pages/CompaniesDetails/CompaniesDetail';
import Jobs from './views/User-View/pages/Jobs/Jobs';
import JobDetailPage from './views/User-View/pages/JobDetailPage/JobDetailPage';
import Pricing from './views/User-View/pages/Pricing/Pricing';
import Contact from './views/User-View/pages/Contact/Contact';
import Login from './views/User-View/pages/Login/Login';
import Signup from './views/User-View/pages/Signup/Signup';
import DashboardPage from './views/User-View/pages/User-Dashboard/Dashboard/Dashboard';
import AppliedJob from './views/User-View/pages/User-Dashboard/AppliedJobs/AppliedJobs';
import UnfinishedJob from './views/User-View/pages/User-Dashboard/UnfinishedJobs/UnfinishedJob';
import SavedJob from './views/User-View/pages/User-Dashboard/SavedJobs/SavedJob';
import Interview from './views/User-View/pages/User-Dashboard/Interview/Interview';
import ProfilePage from './views/User-View/pages/User-Dashboard/ProfilePage/ProfilePage';
import MessagesPage from './views/User-View/pages/User-Dashboard/Messages/Messagespage';
import UserViewLayout from './views/User-View/UserViewLayout';
import HRViewLayout from './views/HR-View/HRViewLayout';
import AdminViewLayout from './views/Admin-View/AdminViewLayout';
import HireDashboardPage from './views/HR-View/pages/HireDashboard/HireDashboard';
import HireDashboardInterviewsPage from './views/HR-View/pages/HireDashboardInterviewsPage/HireDashboardInterviewsPage';
import HireDashboardHiresPage from './views/HR-View/pages/HireDashboardHiresPage/HireDashboardHiresPage';
import HireDashboardAnalyticsPage from './views/HR-View/pages/HireDashboardAnalyticsPage/HireDashboardAnalyticsPage';
import HireDashboardSettingsPage from './views/HR-View/pages/HireDashboardSettingsPage/HireDashboardSettingsPage';
import HireDashboardApplicationsPage from './views/HR-View/pages/HireDashboardApplicationsPage/HireDashboardApplicationsPage';
import HireDashboardListingsPage from './views/HR-View/pages/HireDashboardListingsPage/HireDashboardListingsPage';
import HireDashboardMessagesPage from './views/HR-View/pages/HireDashboardMessagesPage/HireDashboardMessagesPage';
import HireDashboardTeamPage from './views/HR-View/pages/HireDashboardTeamPage/HireDashboardTeamPage';
import ResumePage from './views/User-View/pages/User-Dashboard/Resume/ResumePage';
import AdminDashboardOverviewPage from './views/Admin-View/pages/AdminDashboardOverviewPage/AdminDashboardOverviewPage';
import AdminDashboardContentPage from './views/Admin-View/pages/AdminDashboardContentPage/AdminDashboardContentPage';
import AdminDashboardUsersPage from './views/Admin-View/pages/AdminDashboardUsersPage/AdminDashboardUsersPage';
import AdminDashboardSettingsPage from './views/Admin-View/pages/AdminDashboardSettingsPage/AdminDashboardSettingsPage';
import AdminDashboardLogsPage from './views/Admin-View/pages/AdminDashboardLogsPage/AdminDashboardLogsPage';
import AdminDashboardReportsPage from './views/Admin-View/pages/AdminDashboardReportsPage/AdminDashboardReportsPage';
import AdminTeam from './views/Admin-View/pages/AdminTeam/AdminTeam';
import AdminPricing from './views/Admin-View/pages/AdminPricing/AdminPricing';
import AdminActivityTracker from './views/Admin-View/components/shared/AdminActivityTracker';
import { PlatformAdminProvider } from './context/PlatformAdminContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
    useEffect(() => {
        Aos.init({ duration: 1250, once: true })
    }, [])
    return (
        <IntlProvider locale="en" messages={{}}>
            <PlatformAdminProvider>
            <BrowserRouter>
            <AuthProvider>
                <AdminActivityTracker />
                <Routes>
                    <Route element={<UserViewLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<About />} />
                        <Route path="/companies" element={<Companies />} />
                        <Route path="/companies/:id" element={<CompaniesDetail />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/contact-us" element={<Contact />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/jobs/:id" element={<JobDetailPage />} />
                        <Route path="/dashboard" element={<DashboardPage/>} />
                        <Route path="/user-dashboard" element={<DashboardPage/>} />
                        <Route path="/user-dashboard/dashboard" element={<DashboardPage/>} />
                        <Route path="/applied-jobs" element={<AppliedJob/>} />
                        <Route path="/user-dashboard/applied-jobs" element={<AppliedJob/>} />
                        <Route path="/unfinished-jobs" element={<UnfinishedJob/>} />
                        <Route path="/user-dashboard/unfinished-jobs" element={<UnfinishedJob/>} />
                        <Route path="/saved-jobs" element={<SavedJob/>} />
                        <Route path="/user-dashboard/saved-jobs" element={<SavedJob/>} />
                        <Route path="/interviews" element={<Interview/>} />
                        <Route path="/user-dashboard/interviews" element={<Interview/>} />
                        <Route path="/interviews/join/:token" element={<Interview/>} />
                        <Route path="/user-dashboard/interviews/join/:token" element={<Interview/>} />
                        <Route path="/interviews/:roomName" element={<Interview/>} />
                        <Route path="/user-dashboard/interviews/:roomName" element={<Interview/>} />
                        <Route path="/profile" element={<ProfilePage/>} />
                        <Route path="/user-dashboard/profile" element={<ProfilePage/>} />
                        <Route path="/messages" element={<MessagesPage/>} />
                        <Route path="/user-dashboard/messages" element={<MessagesPage/>} />
                        <Route path="/resume" element={<ResumePage />} />
                        <Route path="/user-dashboard/resume" element={<ResumePage />} />
                    </Route>

                    <Route element={<HRViewLayout />}>
                        <Route path="/hire-dashboard" element={<HireDashboardPage />} />
                        <Route path="/hire-dashboard/interviews" element={<HireDashboardInterviewsPage />} />
                        <Route path="/hire-dashboard/hires" element={<HireDashboardHiresPage />} />
                        <Route path="/hire-dashboard/analytics" element={<HireDashboardAnalyticsPage />} />
                        <Route path="/hire-dashboard/settings" element={<HireDashboardSettingsPage />} />
                        <Route path="/hire-dashboard/applications" element={<HireDashboardApplicationsPage />} />
                        <Route path="/hire-dashboard/listings" element={<HireDashboardListingsPage />} />
                        <Route path="/hire-dashboard/messages" element={<HireDashboardMessagesPage />} />
                        <Route path="/hire-dashboard/team" element={<HireDashboardTeamPage />} />
                    </Route>

                    <Route element={<AdminViewLayout />}>
                        <Route path="/admin-dashboard" element={<AdminDashboardOverviewPage />} />
                        <Route path="/admin-dashboard/content" element={<AdminDashboardContentPage />} />
                        <Route path="/admin-dashboard/users" element={<AdminDashboardUsersPage />} />
                        <Route path="/admin-dashboard/reports" element={<AdminDashboardReportsPage />} />
                        <Route path="/admin-dashboard/logs" element={<AdminDashboardLogsPage />} />
                        <Route path="/admin-dashboard/settings" element={<AdminDashboardSettingsPage />} />
                        <Route path="/admin-dashboard/team" element={<AdminTeam />} />
                        <Route path="/admin-dashboard/pricing" element={<AdminPricing />} />
                    </Route>
                </Routes>
            </AuthProvider>
            </BrowserRouter>
            </PlatformAdminProvider>
        </IntlProvider>
    );
}
