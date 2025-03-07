import Navigation from '@/components/Navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Your Name</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A passionate developer focused on creating beautiful and functional web experiences.
              I specialize in modern web technologies and user-centric design.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="#contact"
                className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="#projects"
                className="rounded-md bg-gray-100 dark:bg-gray-800 px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
          {/* Add about content here */}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
          {/* Add projects grid here */}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
          {/* Add skills grid here */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
          {/* Add contact form here */}
        </div>
      </section>
    </main>
  );
}
