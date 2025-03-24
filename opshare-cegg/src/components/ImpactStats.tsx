import React from 'react';
import { ArrowUpRight, TreePine, DollarSign, Users, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    id: 1,
    title: 'Resources Saved',
    value: '120',
    unit: 'tons',
    description: 'of materials kept out of landfills',
    icon: <TreePine className="w-6 h-6" />,
    color: 'green',
    bgGradient: 'from-green-500/20 to-green-600/20',
    iconColor: 'text-green-400',
  },
  {
    id: 2,
    title: 'Money Saved',
    value: '2.4',
    unit: 'million',
    description: 'dollars saved by our community',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'yellow',
    bgGradient: 'from-amber-500/20 to-amber-600/20',
    iconColor: 'text-amber-400',
  },
  {
    id: 3,
    title: 'Community Members',
    value: '5,200',
    unit: '+',
    description: 'active users sharing resources',
    icon: <Users className="w-6 h-6" />,
    color: 'teal',
    bgGradient: 'from-teal-500/20 to-teal-600/20',
    iconColor: 'text-teal-400',
  },
  {
    id: 4,
    title: 'Carbon Footprint',
    value: '85',
    unit: 'tons',
    description: 'of CO₂ emissions prevented',
    icon: <Leaf className="w-6 h-6" />,
    color: 'green',
    bgGradient: 'from-green-500/20 to-green-600/20',
    iconColor: 'text-green-400',
  },
];

const ImpactStats = () => {
  return (
    <section className="bg-gradient-to-br from-green-900 via-green-800 to-teal-800 text-white py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-yellow-400 mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-green-400 mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-teal-400 mix-blend-overlay filter blur-3xl opacity-10"></div>
      </div>
    
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            Sustainability Metrics
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Our Collective Impact</h2>
          <p className="text-white/80 text-lg">
            Every item shared or reused contributes to a more sustainable future. See how our community is making a difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={stat.id} 
              className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm border-0 shadow-xl animate-scale-in hover:scale-105 transition-transform duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-white/10 backdrop-blur-sm mb-5 ${stat.iconColor}`}>
                  {stat.icon}
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">{stat.title}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">{stat.value}</span>
                  <span className="text-xl ml-1 text-white/90">{stat.unit}</span>
                </div>
                <p className="text-white/70 mt-2 text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button 
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-green-900 font-medium py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            View Full Impact Report
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
