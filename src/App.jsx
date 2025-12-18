import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { Calculator } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo Section */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Fin-Sight</h1>
                <span className="text-xs text-gray-500 font-medium hidden sm:block">스마트 금융 계산기</span>
              </div>
            </NavLink>

            {/* Navigation */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                계산기
              </NavLink>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive || window.location.pathname.startsWith('/blog')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                블로그
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
