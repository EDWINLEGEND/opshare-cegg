# Cloudinary Integration for OpShare

This guide explains how to set up and use Cloudinary for image uploads in OpShare, replacing the local storage system.

## What is Cloudinary?

Cloudinary is a cloud-based service that provides:
- Image and video storage
- Real-time transformations and optimizations
- Fast CDN delivery
- Responsive images
- Automatic format optimization

## Benefits for OpShare

- Scalable storage without server limitations
- Automatic image optimization for faster loading
- CDN distribution for global performance
- No need to manage local file storage
- Advanced image transformations if needed

## Setup Instructions

### 1. Create a Cloudinary Account

- Go to [Cloudinary.com](https://cloudinary.com/) and sign up for a free account
- The free tier offers 25GB storage and 25GB bandwidth per month

### 2. Get Your Cloudinary Credentials

After signing up, find your account details in the Cloudinary dashboard:
- Cloud name
- API Key
- API Secret

### 3. Configure Environment Variables

Add these values to your `.env` file:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Install Required Packages

We've already installed the required packages:
```
npm install cloudinary multer-storage-cloudinary
```

### 5. Using the Migration Script

If you have existing images stored locally in the `/uploads` directory, you can migrate them to Cloudinary:

```
node migrate-images.js
```

This script will:
- Scan all items in the database
- Look for image URLs starting with `/uploads/`
- Upload those images to Cloudinary
- Update the database with the new Cloudinary URLs

## How It Works

1. User uploads images via the SellForm component
2. Images are sent to the server as usual
3. Multer middleware processes the uploads using Cloudinary storage
4. Cloudinary stores the images and returns secure URLs
5. The URLs are stored in the database
6. Images are served directly from Cloudinary's CDN

## Customization Options

### Image Transformations

You can modify the `transformation` parameter in the CloudinaryStorage configuration to apply automatic transformations:

```javascript
transformation: [
  { width: 800, height: 600, crop: "limit" },
  { quality: "auto" }
]
```

### Folders and Organization

Images are stored in the 'opshare' folder on Cloudinary. You can change this by modifying the `folder` parameter.

## Troubleshooting

### Images Not Appearing

- Check the browser console for errors
- Verify that the Cloudinary URLs are correctly stored in the database
- Ensure your Cloudinary account is active

### Upload Errors

- Check your API credentials
- Verify file size limits
- Check Cloudinary dashboard for rate limiting or quota issues

## Support

If you encounter issues, refer to:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- Cloudinary's support team is excellent and responsive 