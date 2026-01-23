import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with hardcoded credentials for now as per instructions
cloudinary.config({
    cloud_name: 'dbjhheysk',
    api_key: '879714414346872',
    api_secret: 'rP2olTx4kPmDU4jN9pH0WII7YdQ',
    secure: true
});

export default cloudinary;
