
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import FeaturedItems from '../components/FeaturedItems';
import ImpactStats from '../components/ImpactStats';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <main>
        <Hero />
        <CategorySection />
        <FeaturedItems />
        <div className="py-16 px-4 bg-muted flex flex-col lg:flex-row gap-8 items-center justify-center">
          <div className="glass-card p-8 md:p-10 max-w-lg animate-fade-in">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-yellow bg-yellow-50 rounded-full">FEATURED COMMUNITY</span>
            <h3 className="text-2xl font-bold mb-4">Urban Garden Tool Library</h3>
            <p className="text-muted-foreground mb-6">
              The Seattle Urban Garden Tool Library has served over 500 community members,
              providing access to specialized gardening equipment that would otherwise go unused
              for most of the year.
            </p>
            <button className="btn-ghost">Learn More</button>
          </div>
          <div className="aspect-video w-full max-w-2xl rounded-xl overflow-hidden shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <img
              src="https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Community garden tools"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <ImpactStats />
        <section className="section-padding text-center">
          <div className="container mx-auto max-w-4xl animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Sharing?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of others who are building a more sustainable community through sharing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Share an Item</button>
              <button className="btn-ghost">Browse Items</button>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default Index;
