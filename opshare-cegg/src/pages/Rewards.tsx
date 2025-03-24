// Fix reward images
{filteredRewards.map(reward => (
  <div key={reward.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center relative">
      {reward.image ? (
        <img 
          src={reward.image} 
          alt={reward.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback based on reward category
            const fallbacks = {
              "feature": "https://images.unsplash.com/photo-1586892478025-2b5472316f22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              "discount": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              "badge": "https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              "premium": "https://images.unsplash.com/photo-1620428268482-cf1851a383b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            };
            e.currentTarget.src = fallbacks[reward.category] || "https://via.placeholder.com/400x200?text=Reward";
            e.currentTarget.onerror = null;
          }}
        />
      ) : (
        <Gift size={64} className="text-white" />
      )}
      {/* Category badge */}
    </div>
    {/* Reward content */}
  </div>
))}

// Fix badge images in the badges tab
{userBadges.map(badgeId => {
  const badge = rewards.find(r => r.id === badgeId);
  return badge ? (
    <div key={badgeId} className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-2">
        {badge.image ? (
          <img 
            src={badge.image} 
            alt={badge.name}
            className="w-16 h-16 object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/64?text=Badge";
              e.currentTarget.onerror = null;
            }}
          />
        ) : (
          <Shield size={40} className="text-purple-600" />
        )}
      </div>
      <div className="font-medium text-center">{badge.name}</div>
    </div>
  ) : null;
})} 