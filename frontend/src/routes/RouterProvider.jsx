import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes.jsx";
import LoginRoute from "./LoginRoute";
import AuthRoutes from "./AuthRoutes.jsx";
import Login from "../pages/Login/index.jsx";
import Dashboard from "../components/Dashboard/";
import AnalyseChartiste from "../components/analyse/index.jsx";
import ProfileFin from "../components/ProfileFin/";
import Users from "../pages/users/";
import Stats from "../pages/stats/";
import AnalyseSectorial from "../components/AnalyseSectorial/";
import Markowitz from "../components/Markowitz/index.jsx";
import Opcvm from "../components/OPCVM/";
import Backtest from "../components/Backtest/Backtest.jsx";
import Portefeuilles from "../components/portefeuilles/Portefeuilles.jsx";
import Tracking from "../components/Tracking/";
import AnalyseOPCVM from "../components/AnalyseOPCVM/";
import CompositionOPCVM from "../components/CompositionOPCVM/";
import FixedIncome from "../components/FixedIncome/";
// import BlackLitterman from "../components/BlackLitterman/";
import MeanRisk from "../components/BlackLitterman/MeanRiskOpti/Index.jsx";
import Consultation from "../components/Consultation/";
import ScrollToTop from "../components/Ui/ScrollToTop.jsx";
import Ptfs from "../components/Consultation/Ptfs.jsx";
import News from "../pages/News/";
import ArticleDetails from "../pages/News/ArticleDetails.jsx";

function RouterProvider() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AuthRoutes />}>
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
          <Route element={<UserRoutes />}>
            {/* NEWS */}
            <Route path="" element={<News />} />
            <Route path="/news/article/:id" element={<ArticleDetails />} />

            {/* DASHBOARD */}
            <Route path="/dashboard-actions" element={<Dashboard />} />
            <Route path="/dashboard-taux" element={<FixedIncome />} />

            {/* ANALYSE */}
            <Route path="/analyse-chartiste" element={<AnalyseChartiste />} />
            <Route path="/analyse-sectorielle" element={<AnalyseSectorial />} />
            <Route path="/profile-financier" element={<ProfileFin />} />

            {/* CREATION DE PTF */}
            <Route path="/markowitz" element={<Markowitz />} />
            <Route
              path="/black-litterman"
              element={<MeanRisk type="Actions" />}
            />
            <Route path="/opcvm" element={<Opcvm />} />
            <Route
              path="/black-litterman-opc"
              element={<MeanRisk type="OPCVM" />}
            />

            {/* SIMULATION */}
            <Route path="/consultation" element={<Ptfs />} />
            <Route path="/backtest" element={<Backtest />} />
            <Route path="/portefeuilles" element={<Portefeuilles />} />

            {/* ANALYSE OPCVM */}
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/analyse-quantitative" element={<AnalyseOPCVM />} />
            <Route path="/composition-opcvm" element={<CompositionOPCVM />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/users" element={<Users />} />
            <Route path="/statistiques" element={<Stats />} />
          </Route>
          <Route element={<LoginRoute />}>
            <Route element={<Login />} path="/login" />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default RouterProvider;
