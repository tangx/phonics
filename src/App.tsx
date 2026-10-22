import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AppShellLayout from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import BooksHomePage from './pages/BooksHomePage'
import BookUnitsPage from './pages/BookUnitsPage'
import BookPage from './pages/BookPage'
import SightWordsPage from './pages/SightWordsPage'
import SettingsPage from './pages/SettingsPage'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShellLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="books" element={<BooksHomePage />} />
          <Route path="books/:semesterId" element={<BookUnitsPage />} />
          <Route path="books/:semesterId/:unitId" element={<BookPage />} />
          <Route path="books/:semesterId/:unitId/:word" element={<BookPage />} />
          <Route path="sight-words" element={<SightWordsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
