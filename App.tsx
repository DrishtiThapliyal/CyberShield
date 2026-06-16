import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { AssessmentsPage } from './pages/AssessmentsPage'
import { PasswordLabPage } from './pages/PasswordLabPage'
import { RiskCalculatorPage } from './pages/RiskCalculatorPage'
import { PersonalityTestPage } from './pages/PersonalityTestPage'
import { PhishingTestPage } from './pages/PhishingTestPage'
import { MythBustersPage } from './pages/MythBustersPage'
import { ReportPage } from './pages/ReportPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="password-lab" element={<PasswordLabPage />} />
        <Route path="assessments/risk-calculator" element={<RiskCalculatorPage />} />
        <Route path="assessments/personality-test" element={<PersonalityTestPage />} />
        <Route path="assessments/phishing-test" element={<PhishingTestPage />} />
        <Route path="assessments/myth-busters" element={<MythBustersPage />} />
        <Route path="report" element={<ReportPage />} />
      </Route>
    </Routes>
  )
}

export default App
