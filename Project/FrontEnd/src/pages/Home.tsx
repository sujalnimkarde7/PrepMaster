import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Code, Users, Lightbulb, ChevronRight, Trophy, Target, Rocket } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const categories = [
  {
    title: 'Aptitude Tests',
    icon: <Brain className="h-6 w-6" />,
    description: 'Sharpen your quantitative and logical reasoning skills',
    color: 'from-purple-500 to-purple-600',
    path: '/aptitude-tests'
  },
  {
    title: 'Coding Challenges',
    icon: <Code className="h-6 w-6" />,
    description: 'Practice DSA and solve programming problems',
    color: 'from-blue-500 to-blue-600',
    path: '/coding-challenges'
  },
  {
    title: 'Mock Interviews',
    icon: <Users className="h-6 w-6" />,
    description: 'Prepare with realistic interview simulations',
    color: 'from-green-500 to-green-600',
    path: '/mock-interviews'
  },
  {
    title: 'Logical Reasoning',
    icon: <Lightbulb className="h-6 w-6" />,
    description: 'Enhance your problem-solving abilities',
    color: 'from-orange-500 to-orange-600',
    path: '/aptitude-tests'
  }
];

const features = [
  {
    icon: <Trophy className="h-8 w-8" />,
    title: 'Track Progress',
    description: 'Monitor your improvement with detailed analytics'
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: 'Personalized Path',
    description: 'Get customized preparation recommendations'
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: 'Company Specific',
    description: 'Targeted preparation for your dream companies'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              {...fadeIn}
            >
              Ace Your Placements
              <span className="block text-blue-600 dark:text-blue-400">with Confidence!</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              Your comprehensive platform for placement preparation. Practice, learn, and succeed with our expertly curated resources.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/practice"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Practicing
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Sign Up Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Comprehensive Preparation Categories
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link to={category.path} key={index}>
                <motion.div
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r rounded-lg transform -rotate-2 opacity-70 group-hover:rotate-0 transition-transform"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg group-hover:translate-y-1 transition-all">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mb-4`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of students who have successfully landed their dream jobs.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}