import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppShellLayout from './pages/HomePage'
import BooksHomePage from './pages/BooksHomePage'
import BookUnitsPage from './pages/BookUnitsPage'
import BookPage from './pages/BookPage'
import SightWordsPage from './pages/SightWordsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppShellLayout />}>
          <Route index element={<Navigate to="/books" replace />} />
          <Route path="books" element={<BooksHomePage />} />
          <Route path="books/:semesterId" element={<BookUnitsPage />} />
          <Route path="books/:semesterId/:unitId" element={<BookPage />} />
          <Route path="books/:semesterId/:unitId/:word" element={<BookPage />} />
          <Route path="sight-words" element={<SightWordsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
