'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Check for user in localStorage
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    router.push('/login')
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden rounded-full">
              <Image
                src="/images/images/logo.jpg"
                alt="HebaAbozaid Academy"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/20 transition-all duration-300" />
            </div>
            <span className={`text-2xl font-serif font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              HebaAbozaidAcademy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: '/courses', label: 'Courses' },
              { href: '/about', label: 'About' },
              { href: '/testimonials', label: 'Testimonials' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-lg font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-gray-800 hover:text-gray-600' : 'text-white hover:text-white/80'
                }`}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>

          {/* User Menu / CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className={`text-lg font-medium ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className={`text-lg font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-gray-800 hover:text-gray-600' : 'text-white hover:text-white/80'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`relative text-lg font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-gray-800 hover:text-gray-600' : 'text-white hover:text-white/80'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className={`relative overflow-hidden px-6 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-gray-900 text-white hover:bg-gray-800' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="relative z-10">Get Started</span>
                  <div className={`absolute inset-0 transform scale-x-0 transition-transform duration-300 origin-left ${
                    isScrolled ? 'bg-gray-800' : 'bg-gray-100'
                  }`} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in bg-white/90 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              {[
                { href: '/courses', label: 'Courses' },
                { href: '/about', label: 'About' },
                { href: '/testimonials', label: 'Testimonials' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-800 hover:text-gray-600 transition-colors px-4 py-2 text-lg hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t">
                {user ? (
                  <>
                    <span className="text-gray-800 px-4 py-2 text-lg">
                      {user.username}
                    </span>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-gray-800 hover:text-gray-600 transition-colors text-lg hover:bg-gray-50 rounded-lg px-4 py-2 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-800 hover:text-gray-600 transition-colors text-lg hover:bg-gray-50 rounded-lg px-4 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-2 rounded-lg text-lg font-medium transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 