import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './pages/dashboard';
import QuestionPage from './pages/QuestionPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Account from './pages/Account';
import LangageCards from './pages/LangageCards';
import CoursView from './pages/CoursView';
import RedirectToPreferredLanguage from './Components/RedirectToPreferredLanguage';
import { ProgressProvider } from './Components/ProgressContext';
import Learn from './pages/Learn';
import Qfinished from './pages/Qfinished';
import MiniQuiz from './pages/MiniQuiz';
import Welcome from './pages/Welcome';
import Continue from './pages/Continue';
import GlobalQuiz from './pages/GlobalQuiz';
import QuizQuestions from './pages/QuizQuestions';
import QuizComplete from './pages/QuizComplete';
import QuizReview from './pages/QuizReview';
import TextPropertiesEditor from './Components/TextPropertiesEditor';


import AdminRoute from './AdminRoute';
import UserOnlyRoute from './Components/UserOnlyRoute'; // nouveau
import AdminDashboard from './pages/admin/Dashboard';
import Badges from './pages/Badges';

export default function App() {
  return (
    <ProgressProvider>
      <Router>
        <ToastContainer 
          theme="dark" 
          style={{ zIndex: 10000 }}
        />
        <Routes>
          
          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/onboard/:slug" element={<QuestionPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/start-questionnaire" element={<Welcome />} />
            <Route path="/continue-questionnaire" element={<Continue />} />
            <Route path="/finish-questionnaire" element={<Qfinished />} />
          </Route>
          <Route path="/profile" element={<Account />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Utilisateur connecté (privé) */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/dashboard"
              element={<UserOnlyRoute><Dashboard /></UserOnlyRoute>}
            />
            <Route
              path="/langages"
              element={<UserOnlyRoute><LangageCards /></UserOnlyRoute>}
            />
            <Route
              path="/home"
              element={<UserOnlyRoute><RedirectToPreferredLanguage /></UserOnlyRoute>}
            />
            <Route
              path="/courses"
              element={<UserOnlyRoute><LangageCards /></UserOnlyRoute>}
            />
            <Route
              path="/home/:id"
              element={<UserOnlyRoute><Learn /></UserOnlyRoute>}
            />

            <Route
              path="/cours/:id"
              element={<UserOnlyRoute><CoursView /></UserOnlyRoute>}
            />
            <Route
              path="/mini-quiz"
              element={<UserOnlyRoute><MiniQuiz /></UserOnlyRoute>}
            />
            <Route
              path="/global-quiz/:id"
              element={<UserOnlyRoute><GlobalQuiz /></UserOnlyRoute>}
            />
            <Route
              path="/global-quiz/start/:id"
              element={<UserOnlyRoute><QuizQuestions /></UserOnlyRoute>}
            />
            <Route
              path="/global-quiz/complete"
              element={<UserOnlyRoute><QuizComplete /></UserOnlyRoute>}
            />
            <Route
              path="/global-quiz/review/:id"
              element={<UserOnlyRoute><QuizReview /></UserOnlyRoute>}
            />
          </Route>

          {/* Route spéciale sans protection */}
          <Route path="/text" element={<TextPropertiesEditor />} />
          <Route path="/badges" element={< Badges />}/>

        </Routes>
      </Router>
    </ProgressProvider>
  );
}
