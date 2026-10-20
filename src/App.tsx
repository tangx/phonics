import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppShellLayout from './pages/HomePage'
import BooksHomePage from './pages/BooksHomePage'
import BookPage from './pages/BookPage'
import SightWordsPage from './pages/SightWordsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShellLayout />}>
          <Route index element={<Navigate to="/books" replace />} />
          <Route path="books" element={<BooksHomePage />} />
          <Route path="books/:semesterId" element={<BookPage />} />
          <Route path="books/:semesterId/:unitId" element={<BookPage />} />
          <Route path="books/:semesterId/:unitId/:word" element={<BookPage />} />
          <Route path="sight-words" element={<SightWordsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
