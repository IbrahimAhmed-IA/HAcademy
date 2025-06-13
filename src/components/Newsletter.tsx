'use client'

import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section className="section bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="mb-4">Stay Updated with Our Latest Courses</h2>
          <p className="text-lg text-white/90 mb-8">
            Subscribe to our newsletter and be the first to know about new courses, special offers, and nutrition tips.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-secondary whitespace-nowrap"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Subscribing...
                </span>
              ) : (
                'Subscribe Now'
              )}
            </button>
          </form>

          {status === 'success' && (
            <div className="mt-4 text-green-200 animate-fade-in">
              Thank you for subscribing! Please check your email to confirm your subscription.
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 text-red-200 animate-fade-in">
              Oops! Something went wrong. Please try again later.
            </div>
          )}

          <p className="mt-6 text-sm text-white/60">
            By subscribing, you agree to our{' '}
            <a href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="underline hover:text-white">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter 