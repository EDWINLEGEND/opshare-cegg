
import React from 'react';
import { ArrowUpRight, TreePine, DollarSign, Users, Leaf } from 'lucide-react';

const stats = [
  {
    id: 1,
    title: 'Resources Saved',
    value: '120',
    unit: 'tons',
    description: 'of materials kept out of landfills',
    icon: <TreePine className="w-6 h-6" />,
    color: 'green',
  },
  {
    id: 2,
    title: 'Money Saved',
    value: '2.4',
    unit: 'million',
    description: 'dollars saved by our community',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'yellow',
  },
  {
    id: 3,
    title: 'Community Members',
    value: '5,200',
    unit: '+',
    description: 'active users sharing resources',
    icon: <Users className="w-6 h-6" />,
    color: 'teal',
  },
  {
    id: 4,
    title: 'Carbon Footprint',
    value: '85',
    unit: 'tons',
    description: 'of CO₂ emissions prevented',
    icon: <Leaf className="w-6 h-6" />,
    color: 'green',
  },
];

const ImpactStats = () => {
  return (
    <section className="bg-gradient-to-br from-green-900 to-teal-800 text-white py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-yellow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-green-700"></div>
      </div>
    
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Collective Impact</h2>
          <p className="text-white/80 text-lg">
            Every item shared or reused contributes to a more sustainable future. See how our community is making a difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className="glass-card bg-white/10 backdrop-blur-sm border-white/10 p-6 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-${stat.color}/20 mb-5`}>
                {stat.icon}
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{stat.title}</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{stat.value}</span>
                <span className="text-xl ml-1">{stat.unit}</span>
              </div>
              <p className="text-white/70 mt-2 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="btn-accent bg-yellow text-green-900 hover:bg-yellow-400">
            View Full Impact Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
