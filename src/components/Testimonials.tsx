'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Instructor",
    image: "/testimonials/sarah.jpg",
    content: "The sports nutrition course transformed my approach to training. I've seen remarkable improvements in my clients' performance and recovery.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Health Coach",
    image: "/testimonials/michael.jpg",
    content: "The comprehensive curriculum and expert guidance helped me build a successful nutrition coaching practice. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Personal Trainer",
    image: "/testimonials/emma.jpg",
    content: "The practical knowledge I gained has been invaluable. I can now provide better nutrition guidance to my clients.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Wellness Entrepreneur",
    image: "/testimonials/david.jpg",
    content: "The business aspects covered in the course helped me launch my nutrition consulting practice successfully.",
    rating: 5,
  },
]

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="section-header">
          <h2>Student Success Stories</h2>
          <p>
            Hear from our graduates about their journey and how our courses have helped them achieve their goals.
          </p>
        </div>

        <div className="relative">
          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 ${
                  index === activeIndex
                    ? 'scale-105 shadow-xl'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-primary w-4'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { label: "Graduates", value: "1000+" },
            { label: "Success Rate", value: "98%" },
            { label: "Course Rating", value: "4.9/5" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-2xl animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials 