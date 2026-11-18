import { Layout, Header, MediaInfo } from 'layouts'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

/** "/" locally, "/rikaflix" on GitHub Pages (Vite's `base`, without the trailing slash). */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Header />} />
            <Route path="/shows/:id" element={<MediaInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
