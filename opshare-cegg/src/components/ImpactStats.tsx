import React from 'react';
import { ArrowUpRight, TreePine, DollarSign, Users, Leaf, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    id: 1,
    title: 'Resources Saved',
    value: '120',
    unit: 'tons',
    description: 'of materials kept out of landfills',
    icon: <TreePine className="w-6 h-6" />,
    bgGradient: 'from-emerald-500 to-green-600',
    iconBg: 'bg-emerald-600',
    textColor: 'text-white',
    descColor: 'text-emerald-50/90',
    animation: 'animate-pulse'
  },
  {
    id: 2,
    title: 'Money Saved',
    value: '2.4',
    unit: 'million',
    description: 'dollars saved by our community',
    icon: <DollarSign className="w-6 h-6" />,
    bgGradient: 'from-amber-500 to-yellow-600',
    iconBg: 'bg-amber-600',
    textColor: 'text-white',
    descColor: 'text-amber-50/90',
    animation: 'animate-bounce'
  },
  {
    id: 3,
    title: 'Community Members',
    value: '5,200',
    unit: '+',
    description: 'active users sharing resources',
    icon: <Users className="w-6 h-6" />,
    bgGradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-600',
    textColor: 'text-white',
    descColor: 'text-blue-50/90',
    animation: 'animate-pulse'
  },
  {
    id: 4,
    title: 'Carbon Footprint',
    value: '85',
    unit: 'tons',
    description: 'of CO₂ emissions prevented',
    icon: <Leaf className="w-6 h-6" />,
    bgGradient: 'from-purple-500 to-pink-600',
    iconBg: 'bg-purple-600',
    textColor: 'text-white',
    descColor: 'text-purple-50/90',
    animation: 'animate-bounce'
  },
];

const ImpactStats = () => {
  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-r from-green-50 via-green-100 to-emerald-50">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-400/20 mix-blend-multiply filter blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-green-300/30 mix-blend-multiply filter blur-[100px]"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-teal-400/20 mix-blend-multiply filter blur-[80px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-lime-300/20 mix-blend-multiply filter blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-1.5 rounded-full bg-emerald-600/90 backdrop-blur text-white border-emerald-400 text-sm font-medium"
          >
            Community Impact Metrics
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent">
            Our Collective Impact
          </h2>
          
          <p className="text-emerald-800 text-lg leading-relaxed mx-auto max-w-2xl">
            Every item shared or reused contributes to a more sustainable future. See how our community is making a difference together.
          </p>
        </div>
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <Card 
              key={stat.id} 
              className={`bg-gradient-to-br ${stat.bgGradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              <CardHeader className="pb-2">
                <div className={`inline-flex items-center justify-center p-3 rounded-xl ${stat.iconBg} ${stat.textColor} shadow-lg`}>
                  {stat.icon}
                </div>
                <CardTitle className={`mt-3 text-xl font-bold ${stat.textColor}`}>
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-baseline">
                  <span className={`text-4xl font-extrabold ${stat.textColor}`}>{stat.value}</span>
                  <span className={`text-xl ml-1 ${stat.textColor} opacity-90`}>{stat.unit}</span>
                </div>
                <CardDescription className={`${stat.descColor} mt-2`}>
                  {stat.description}
                </CardDescription>
              </CardContent>
              <CardFooter className={`pt-0 ${stat.descColor}`}>
                <div className={`text-xs uppercase font-semibold tracking-wide flex items-center ${stat.animation} animate-iteration-count-1 animate-duration-2000`}>
                  <span>View details</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Action Button */}
        <div className="text-center mt-16">
          <Button 
            className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-medium rounded-full py-6 px-8 shadow-lg shadow-green-700/20 hover:shadow-green-700/30 transition-all"
            size="lg"
          >
            <span className="mr-2">View Full Impact Report</span>
            <ArrowUpRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
