import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ESPENCourse } from '@/data/courseData'

export default function Courses() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Our Courses</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ESPEN Camp Course Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <img
                src="/images/images/learn.jpeg"
                alt="ESPEN Camp Course"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{ESPENCourse.title}</h2>
              <p className="text-gray-600 mb-4">
                A comprehensive course covering essential nutrition concepts and practical applications.
                Perfect for healthcare professionals and nutrition enthusiasts.
              </p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-500">
                  {ESPENCourse.levels.length} Levels
                </span>
                <span className="text-sm text-gray-500">
                  {ESPENCourse.levels.reduce((acc, level) => acc + level.sessions.length, 0)} Sessions
                </span>
              </div>
              <Link
                href={`/course/${ESPENCourse.id}`}
                className="btn btn-secondary w-full text-center"
              >
                Start Learning
              </Link>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Coming Soon</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Advanced Nutrition</h2>
              <p className="text-gray-600 mb-4">
                Deep dive into advanced nutrition concepts and specialized dietary approaches.
                Stay tuned for more details!
              </p>
              <button
                disabled
                className="btn btn-secondary w-full text-center opacity-50 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Coming Soon</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Clinical Nutrition</h2>
              <p className="text-gray-600 mb-4">
                Specialized course focusing on clinical nutrition applications and case studies.
                Coming soon!
              </p>
              <button
                disabled
                className="btn btn-secondary w-full text-center opacity-50 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
} 