import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              We are dedicated to providing high-quality educational content and courses that empower
              individuals to achieve their learning goals. Our platform combines expert knowledge with
              innovative teaching methods to create an engaging and effective learning experience.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-600 leading-relaxed">
              Our team consists of experienced educators, content creators, and technology experts
              who are passionate about making education accessible and enjoyable for everyone.
              We work together to create comprehensive courses that meet the needs of our diverse
              student community.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="text-gray-600 leading-relaxed">
              We believe in a practical, hands-on approach to learning. Our courses are designed
              to provide real-world applications and immediate value to our students. Through
              interactive content, quizzes, and practical exercises, we ensure that learning is
              both effective and enjoyable.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
} 