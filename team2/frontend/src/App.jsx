import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MyArticlesPage from './pages/MyArticlesPage'
import ArticlePage from './pages/ArticlePage'
import NewArticlePage from './pages/NewArticlePage'
import EditVersionPage from './pages/EditVersionPage'
import PreviewVersionPage from './pages/PreviewVersionPage'

export default function App() {
  return (
    <div className="min-h-screen bg-light text-dark">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/my-articles" element={<MyArticlesPage />} />
        <Route path="/articles/new" element={<NewArticlePage />} />
        <Route path="/articles/:name" element={<ArticlePage />} />
        <Route path="/versions/:name/edit" element={<EditVersionPage />} />
        <Route path="/versions/:name/preview" element={<PreviewVersionPage />} />
      </Routes>
    </div>
  )
}
