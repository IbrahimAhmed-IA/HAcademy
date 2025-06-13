'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ESPENCourse } from '@/data/courseData'

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/95" />
        <div className="absolute inset-0 bg-[url('/images/images/header.jpg')] bg-cover bg-center opacity-20 animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 animate-fade-in">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium animate-fade-in-up">
                Welcome to HebaAbozaid Academy
              </span>
              <h1 className="text-5xl md:text-6xl font-serif leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent animate-fade-in-up">
                Transform Your Life Through Expert Nutrition Education
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-xl animate-fade-in-up delay-100">
              Join HebaAbozaid Academy and discover the power of personalized nutrition coaching. 
              Learn from industry experts and achieve your health and wellness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
              <Link 
                href={`/course/${ESPENCourse.id}`} 
                className="group relative overflow-hidden bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
              >
                <span className="relative z-10">Start ESPEN Camp</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
              <Link 
                href="/courses" 
                className="group relative overflow-hidden border-2 border-white text-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
              >
                <span className="relative z-10">View All Courses</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-8 animate-fade-in-up delay-300">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-white overflow-hidden transform hover:scale-110 transition-transform duration-300"
                  >
                    <Image
                      src={`/images/images/${i === 1 ? 'healthy' : i === 2 ? 'food' : i === 3 ? 'sports' : 'learn'}.jpeg`}
                      alt={`Student ${i}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-medium text-lg bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Join 1000+ students</p>
                <p className="text-white/80">Already transformed their lives</p>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="hidden md:grid grid-cols-2 gap-6 animate-slide-in">
            {[
              {
                title: "Expert-Led Courses",
                description: "Learn from certified nutrition professionals",
                image: "learn.jpeg"
              },
              {
                title: "Personalized Coaching",
                description: "Get customized nutrition plans",
                image: "healthy.jpeg"
              },
              {
                title: "Flexible Learning",
                description: "Study at your own pace",
                image: "food.jpeg"
              },
              {
                title: "Community Support",
                description: "Join a supportive community",
                image: "sports.jpeg"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-32 relative overflow-hidden">
                  <Image
                    src={`/images/images/${feature.image}`}
                    alt={feature.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-white mb-2 group-hover:text-white/90 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-white/80 group-hover:text-white/70 transition-colors">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-12 h-20 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  )
}

export default Hero 