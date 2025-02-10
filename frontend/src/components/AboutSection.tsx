import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Target, 
  Rocket,
  Zap,
  Shield,
  Users,
  TrendingUp
} from 'lucide-react';
import WaitlistModal from './WaitlistModal';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
    <div className="relative p-6 bg-black/50 border border-red-500/10 rounded-lg hover:border-red-500/30 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-purple-500/5 rounded-lg"></div>
      <div className="relative">
        <Icon className="w-8 h-8 text-red-500 mb-4 group-hover:animate-pulse" />
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  </div>
);

const AboutSection = () => {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const features = [
    {
      icon: BrainCircuit,
      title: "AI Art Scout",
      description: "Advanced algorithms discover emerging artists and predict trending styles in the digital art space."
    },
    {
      icon: Target,
      title: "Dynamic Pricing",
      description: "AI-powered pricing ensures fair market value for artists and collectors alike."
    },
    {
      icon: Rocket,
      title: "Viral Promotion",
      description: "Automated social media strategies amplify artist visibility and market presence."
    },
    {
      icon: Shield,
      title: "Trustless Auctions",
      description: "Transparent, on-chain English auctions with guaranteed royalty distributions."
    }
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Artists" },
    { icon: Sparkles, value: "50K+", label: "NFTs Created" },
    { icon: TrendingUp, value: "$2M+", label: "Art Traded" },
    { icon: Zap, value: "100%", label: "Secure Transactions" }
  ];

  return (
    <section id="about" className="relative pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-red-500/30 rounded-full blur-[100px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 bg-purple-500/30 rounded-full blur-[80px] opacity-20 animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Vision Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glitch-text">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-purple-500 text-transparent bg-clip-text">
              Shaping the Future of Digital Art
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            CurateAI is revolutionizing the digital art marketplace by combining artificial intelligence, 
            blockchain technology, and automated curation to empower emerging artists and transform how we 
            discover, value, and trade digital art.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-black/30 border border-red-500/20 rounded-lg hover:border-red-500/40 transition-colors duration-300"
            >
              <stat.icon className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Mission Statement */}
        <div className="relative mb-24">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg"></div>
          <div className="relative p-8 md:p-12 border border-red-500/20 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-400 mb-4">
                At CurateAI, we're building more than just a marketplace – we're creating an ecosystem 
                where artificial intelligence meets artistic expression. Our platform empowers emerging 
                artists by providing them with the tools, visibility, and fair compensation they deserve.
              </p>
              <p className="text-gray-400 mb-4">
                Through our innovative AI-driven approach, we're democratizing the digital art space, 
                ensuring that talented artists can be discovered regardless of their following or 
                connections. Our dynamic pricing algorithms and automated promotion systems work 
                tirelessly to maximize artist exposure and ensure fair market values.
              </p>
              <p className="text-gray-400">
                By leveraging blockchain technology, we provide transparent, trustless auctions with 
                guaranteed royalty distributions, ensuring artists continue to benefit from their work's 
                success over time.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-24">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
            Join the Revolution
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Be part of the future of digital art. Join our community of artists, collectors, and 
            innovators shaping the next generation of creative expression.
          </p>
          <button 
            onClick={() => setIsWaitlistModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center space-x-2 mx-auto"
          >
            <Rocket className="w-5 h-5" />
            <span>Join the Waitlist</span>
          </button>
        </div>
      </div>

      <WaitlistModal 
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />
    </section>
  );
};

export default AboutSection;