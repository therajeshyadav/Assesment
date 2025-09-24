import bcrypt from 'bcryptjs';
import { connectDatabase } from './config/database.js';
import { User } from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedUsers = async () => {
  try {
    console.log('🌱 Seeding users...');
    
    // Connect to database
    await connectDatabase();
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (!existingUser) {
      // Create test user
      const hashedPassword = await bcrypt.hash('password', 10);
      
      const testUser = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'healthcare_professional'
      });
      
      await testUser.save();
      console.log('✅ Test user created: test@example.com / password');
    } else {
      console.log('✅ Test user already exists: test@example.com / password');
    }
    
    console.log('🎉 User seeding completed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();