// Migration script to move local images to Cloudinary
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  tlsAllowInvalidCertificates: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('MongoDB connection error:', err);
    process.exit(1);
  });

// Item Schema
const ItemSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  listingType: { type: String, enum: ['rent', 'sell'], default: 'rent' },
  rentalPeriod: { type: String, enum: ['hour', 'day', 'week', 'month'], default: 'day' },
  securityDeposit: { type: Number },
  status: { type: String, enum: ['available', 'borrowed', 'unavailable'], default: 'available' },
  images: [{ type: String }],
  location: { type: String, required: true },
  distance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Item = mongoose.model('Item', ItemSchema);

// Migration function
async function migrateImagesToCloudinary() {
  try {
    console.log('Starting migration of images to Cloudinary...');
    
    // Get all items from the database
    const items = await Item.find({});
    console.log(`Found ${items.length} items to process`);
    
    // Keep track of migration stats
    let totalImages = 0;
    let successfulUploads = 0;
    let failedUploads = 0;
    
    // Process each item
    for (const item of items) {
      console.log(`Processing item: ${item._id} - ${item.title}`);
      
      // Process each image for this item
      const newImageUrls = [];
      
      for (const imageUrl of item.images) {
        totalImages++;
        
        // Check if this is a local image (starts with /uploads/)
        if (imageUrl.startsWith('/uploads/')) {
          try {
            // Get the filename from the URL
            const filename = path.basename(imageUrl);
            const localPath = path.join(__dirname, 'uploads', filename);
            
            // Check if the file exists
            if (fs.existsSync(localPath)) {
              console.log(`Uploading ${filename} to Cloudinary...`);
              
              // Upload to Cloudinary
              const result = await cloudinary.uploader.upload(localPath, {
                folder: 'opshare',
                use_filename: true,
                unique_filename: true
              });
              
              // Add the new Cloudinary URL to our array
              newImageUrls.push(result.secure_url);
              successfulUploads++;
              console.log(`Successfully uploaded ${filename} to Cloudinary: ${result.secure_url}`);
            } else {
              console.log(`File not found: ${localPath}`);
              failedUploads++;
              // If file not found, keep the original URL
              newImageUrls.push(imageUrl);
            }
          } catch (err) {
            console.error(`Error uploading ${imageUrl} to Cloudinary:`, err);
            failedUploads++;
            // If upload fails, keep the original URL
            newImageUrls.push(imageUrl);
          }
        } else {
          // If not a local image, keep the original URL (might already be a Cloudinary URL)
          newImageUrls.push(imageUrl);
        }
      }
      
      // Update the item with the new image URLs
      if (newImageUrls.length > 0 && JSON.stringify(newImageUrls) !== JSON.stringify(item.images)) {
        console.log(`Updating item ${item._id} with new image URLs`);
        item.images = newImageUrls;
        await item.save();
      }
    }
    
    console.log('Migration complete!');
    console.log(`Total images processed: ${totalImages}`);
    console.log(`Successfully uploaded: ${successfulUploads}`);
    console.log(`Failed uploads: ${failedUploads}`);
    
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
  } catch (err) {
    console.error('Migration error:', err);
  }
}

// Run the migration
migrateImagesToCloudinary(); 