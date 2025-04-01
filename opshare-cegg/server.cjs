// Load environment variables
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();



app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'opshare',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 1000, crop: "limit" }] // Resize large images
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

// Initialize upload middleware
const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  tlsAllowInvalidCertificates: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware for authentication
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader ? `${authHeader.substring(0, 15)}...` : 'missing');
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication required: No Authorization header' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authentication required: No token found' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified successfully for user:', decoded.id);
      console.log('Token payload:', decoded);
      req.userId = decoded.id;
      next();
    } catch (tokenError) {
      console.error('Token verification failed:', tokenError.message);
      return res.status(401).json({ 
        message: 'Authentication failed: Invalid token', 
        error: tokenError.message 
      });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: 'Server error in authentication', error: err.message });
  }
};

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

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

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'active', 'completed', 'cancelled'], default: 'pending' },
  fee: { type: Number, required: true },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ 
      token, 
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get user profile
app.get('/api/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update user profile
app.patch('/api/users/:id', auth, async (req, res) => {
  try {
    // Ensure user can only update their own profile
    if (req.userId !== req.params.id) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }

    const { firstName, lastName, email } = req.body;
    const updates = { firstName, lastName, email };
    
    // Remove undefined fields
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);
    
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ITEM ENDPOINTS

// Get items owned by current logged-in user (MUST be before the :id route)
app.get('/api/items/user', auth, async (req, res) => {
  try {
    console.log('Fetching items for user ID:', req.userId);
    
    // Validate that req.userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      console.error('Invalid user ID format:', req.userId);
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    // Find all items owned by the authenticated user
    const items = await Item.find({ ownerId: req.userId })
      .populate({
        path: 'ownerId',
        select: 'firstName lastName',
        model: 'User'
      })
      .sort({ createdAt: -1 }); // Sort by newest first
    
    console.log(`Found ${items.length} items for user ${req.userId}`);
    
    // Transform the output to match what the frontend expects
    const transformedItems = items.map(item => ({
      _id: item._id,
      id: item._id, // Add an alias since frontend uses both
      title: item.title,
      description: item.description,
      category: item.category,
      condition: item.condition,
      price: item.price,
      rentalPeriod: item.rentalPeriod,
      securityDeposit: item.securityDeposit,
      status: item.status,
      images: item.images,
      location: item.location,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      // Format the seller information
      seller: {
        id: item.ownerId._id,
        name: `${item.ownerId.firstName} ${item.ownerId.lastName}`,
        firstName: item.ownerId.firstName,
        lastName: item.ownerId.lastName
      }
    }));
    
    res.status(200).json(transformedItems);
  } catch (err) {
    console.error('Error in /api/items/user endpoint:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all items (with optional filters)
app.get('/api/items', async (req, res) => {
  try {
    const { category, status, search } = req.query;
    
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const items = await Item.find(filter).populate('ownerId', 'firstName lastName');
    
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a specific item
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('ownerId', 'firstName lastName');
    
    if (!item) return res.status(404).json({ message: "Item not found" });
    
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create a new item with image upload
app.post('/api/items', auth, upload.array('images', 5), async (req, res) => {
  try {
    const { 
      title, 
      description, 
      category, 
      condition,
      price, 
      listingType,
      rentalPeriod,
      securityDeposit,
      salePrice,
      location
    } = req.body;
    
    console.log('Creating item for user:', req.userId);
    
    // Process uploaded images from Cloudinary
    // Cloudinary URLs are now available in req.files
    const imageUrls = req.files ? req.files.map(file => file.path) : [];
    
    // Set the correct price based on listing type
    const finalPrice = listingType === 'sell' ? salePrice : price;
    
    const newItem = new Item({
      ownerId: req.userId,
      title,
      description,
      category,
      condition,
      price: finalPrice,
      listingType,
      location,
      status: 'available', // Explicitly set status to 'available'
      rentalPeriod: listingType === 'rent' ? rentalPeriod : undefined,
      securityDeposit: listingType === 'rent' ? securityDeposit : undefined,
      images: imageUrls,
    });
    
    await newItem.save();
    console.log(`Item created: ${newItem._id} with status: ${newItem.status}`);
    
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update an item
app.patch('/api/items/:id', auth, async (req, res) => {
  try {
    const { title, description, category, condition, price, listingType, rentalPeriod, securityDeposit, salePrice, location } = req.body;
    
    // Find the item first to check ownership
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    
    // Check if the user is the owner
    if (item.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this item" });
    }
    
    const updates = { title, description, category, condition, price, listingType, rentalPeriod, securityDeposit, salePrice, location };
    
    // Remove undefined fields
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);
    
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete an item
app.delete('/api/items/:id', auth, async (req, res) => {
  try {
    // Find the item first to check ownership
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    
    // Check if the user is the owner
    if (item.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }
    
    await Item.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get items owned by a user
app.get('/api/users/:id/items', async (req, res) => {
  try {
    const items = await Item.find({ ownerId: req.params.id });
    
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// TRANSACTION ENDPOINTS

// Create a new transaction
app.post('/api/transactions', auth, async (req, res) => {
  try {
    const { itemId, startDate, endDate, fee } = req.body;
    
    // Find the item
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    
    // Check if item is available
    if (item.status !== 'available') {
      return res.status(400).json({ message: "Item is not available for borrowing" });
    }
    
    // Create the transaction
    const newTransaction = new Transaction({
      itemId,
      borrowerId: req.userId,
      lenderId: item.ownerId,
      startDate,
      endDate,
      fee
    });
    
    // Update item status
    item.status = 'borrowed';
    await item.save();
    
    await newTransaction.save();
    
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a specific transaction
app.get('/api/transactions/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('itemId')
      .populate('borrowerId', 'firstName lastName')
      .populate('lenderId', 'firstName lastName');
    
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    
    // Check if user is part of the transaction
    if (
      transaction.borrowerId._id.toString() !== req.userId && 
      transaction.lenderId._id.toString() !== req.userId
    ) {
      return res.status(403).json({ message: "Not authorized to view this transaction" });
    }
    
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update a transaction status
app.patch('/api/transactions/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find the transaction
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    
    // Check if user is part of the transaction
    if (
      transaction.borrowerId.toString() !== req.userId && 
      transaction.lenderId.toString() !== req.userId
    ) {
      return res.status(403).json({ message: "Not authorized to update this transaction" });
    }
    
    // Update the transaction
    transaction.status = status;
    await transaction.save();
    
    // If transaction is completed, update item status back to available
    if (status === 'completed') {
      await Item.findByIdAndUpdate(transaction.itemId, { status: 'available' });
    }
    
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get user's transactions (as borrower or lender)
app.get('/api/users/transactions', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { borrowerId: req.userId },
        { lenderId: req.userId }
      ]
    })
      .populate('itemId')
      .populate('borrowerId', 'firstName lastName')
      .populate('lenderId', 'firstName lastName');
    
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('dist'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
