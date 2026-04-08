/**
 * Database Seed Script
 * Populates MongoDB with sample users and news articles
 * 
 * Run with: npm run seed or babel-node src/seeds/seed.js
 */

import 'dotenv/config';
import { connect, disconnect } from 'mongoose';
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';
import News from '../models/news.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:password@localhost:27017/ur-news?authSource=admin';

// Sample news data with realistic University of Rwanda content
const sampleNews = [
  {
    title: 'UR launches new AI and Data Science Research Center',
    description: `The University of Rwanda has officially launched its new AI and Data Science Research Center aimed at fostering innovation and advancing technological solutions to African challenges. The center will focus on machine learning applications in healthcare, agriculture, and finance sectors.`,
    img: 'https://images.unsplash.com/photo-1677442d019cecf8e5537a58f3f6628be?w=800&h=600&fit=crop',
    status: 'public',
    target: 'CST',
    targetType: 'campus',
  },
  {
    title: 'College of Business & Economics Hosts Annual Entrepreneurship Summit 2026',
    description: `The College of Business & Economics successfully hosted its annual entrepreneurship summit with over 500 participants from different universities across East Africa. The event featured keynote speakers from leading tech startups and investment firms discussing scaling businesses in emerging markets.`,
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    status: 'public',
    target: 'CBE',
    targetType: 'campus',
  },
  {
    title: 'UR School of Engineering Wins Continental Robotics Competition',
    description: `Students from the School of Engineering at University of Rwanda have won first place in the African Robotics Competition 2026. The team developed an autonomous robot designed to detect and respond to environmental hazards in mining operations.`,
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    status: 'public',
    target: 'CST',
    targetType: 'campus',
  },
  {
    title: 'College of Medicine Launches Community Health Initiative',
    description: `The College of Medicine and Health Sciences has launched a new community health initiative aimed at providing free healthcare services to underserved communities in Kigali. Medical students will gain practical experience while serving the community.`,
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    status: 'public',
    target: 'CMHS',
    targetType: 'campus',
  },
  {
    title: 'New Sustainable Agriculture Research Lab Opens at UR',
    description: `The College of Agriculture, Animal Sciences and Veterinary Medicine has opened a state-of-the-art research laboratory dedicated to sustainable farming practices. The lab will conduct research on climate-resilient crop varieties suitable for East African farming communities.`,
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
    status: 'public',
    target: 'CAVM',
    targetType: 'campus',
  },
  {
    title: 'School of Journalism Students Win Regional Media Awards',
    description: `Three journalism students from the School of Journalism and Communication at UR won awards at the East African Media Excellence Awards. Their investigative journalism projects on environmental conservation received recognition from international panels.`,
    img: 'https://images.unsplash.com/photo-1586285541906-a1fbb6c96c6e?w=800&h=600&fit=crop',
    status: 'public',
    target: 'CASS',
    targetType: 'campus',
  },
  {
    title: 'UR Announces Full Scholarship Program for Underprivileged Students',
    description: `The University of Rwanda has announced an expanded scholarship program for academically talented students from low-income families. The initiative aims to increase access to quality higher education and promote social mobility.`,
    img: 'https://images.unsplash.com/photo-1427504494785-cdec5e66f907?w=800&h=600&fit=crop',
    status: 'public',
    target: 'UR',
    targetType: 'university',
  },
  {
    title: 'Campus Sustainability: New Solar Energy System Installation',
    description: `The University of Rwanda has begun installing solar panels across all campuses as part of its commitment to carbon neutrality by 2030. This project will reduce operational costs and serve as a living laboratory for renewable energy research.`,
    img: 'https://images.unsplash.com/photo-1509391366360-2e938286db6c?w=800&h=600&fit=crop',
    status: 'public',
    target: 'UR',
    targetType: 'university',
  },
  {
    title: 'ICT School Launches New Cybersecurity Certification Program',
    description: `The School of ICT has launched a new professional certification program in cybersecurity, developed in partnership with leading tech companies. The program covers ethical hacking, cloud security, and data protection best practices.`,
    img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop',
    status: 'public',
    target: 'CST',
    targetType: 'campus',
  },
  {
    title: 'UR Library Completes Digital Transformation Project',
    description: `The University Library has completed a comprehensive digital transformation, providing students with access to over 500,000 e-books and academic journals. The new online platform includes AI-powered research assistance tools.`,
    img: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=800&h=600&fit=crop',
    status: 'public',
    target: 'UR',
    targetType: 'university',
  },
  {
    title: 'School of Law Organizes International Moot Court Competition',
    description: `The School of Law hosted the East African Inter-University Moot Court Competition with participation from 15 universities. The competition focused on contemporary African legal issues including land rights and climate justice.`,
    img: 'https://images.unsplash.com/photo-1589066623454-3df3e2c6e37c?w=800&h=600&fit=crop',
    status: 'public',
    target: 'CASS',
    targetType: 'campus',
  },
  {
    title: 'Campus Life: New Student Center Inaugurated',
    description: `The new state-of-the-art student center has been inaugurated, featuring study spaces, recreational facilities, food courts, and conference rooms. The center aims to enhance student wellbeing and foster campus community.`,
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    status: 'public',
    target: 'UR',
    targetType: 'university',
  },
];

// Sample users data
const sampleUsers = [
  {
    name: 'Dr. Jean Pierre Mwenge',
    campus: 'Kigali',
    school: 'SICT',
    department: 'Computer Science',
    class: 'Faculty',
    role: 'staff',
    regNumber: 20000001,
    password: 'SecurePass123!',
  },
  {
    name: 'Prof. Alice Nyiraneza',
    campus: 'Kigali',
    school: 'SB',
    department: 'Business Administration',
    class: 'Faculty',
    role: 'staff',
    regNumber: 20000002,
    password: 'SecurePass123!',
  },
  {
    name: 'Admin User',
    campus: 'Kigali',
    school: 'SICT',
    department: 'Administration',
    class: 'Faculty',
    role: 'admin',
    regNumber: 20000003,
    password: 'AdminPass123!',
  },
  {
    name: 'Emmanuel Akiyimpa',
    campus: 'Kigali',
    school: 'ENG',
    department: 'Civil Engineering',
    class: 'Year 3',
    role: 'student',
    regNumber: 21234567,
    password: 'StudentPass123!',
  },
  {
    name: 'Grace Uwase',
    campus: 'Kigali',
    school: 'SJC',
    department: 'Journalism',
    class: 'Year 2',
    role: 'student',
    regNumber: 21234568,
    password: 'StudentPass123!',
  },
  {
    name: 'David Mukiza',
    campus: 'Kigali',
    school: 'SE',
    department: 'Economics',
    class: 'Year 1',
    role: 'student',
    regNumber: 21234569,
    password: 'StudentPass123!',
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await connect(MONGO_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await News.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create users with hashed passwords
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const salt = await bcryptjs.genSalt(10);
        return {
          ...user,
          password: await bcryptjs.hash(user.password, salt),
        };
      })
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✓ Created ${createdUsers.length} users`);

    // Create news with random creators
    const newsWithCreators = sampleNews.map((news) => ({
      ...news,
      creator: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
    }));

    const createdNews = await News.insertMany(newsWithCreators);
    console.log(`✓ Created ${createdNews.length} news articles`);

    // Display created users info
    console.log('\n📋 Sample User Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    createdUsers.forEach((user) => {
      const originalUser = sampleUsers.find((u) => u.name === user.name);
      console.log(`\nName: ${user.name}`);
      console.log(`Reg Number: ${user.regNumber}`);
      console.log(`Role: ${user.role}`);
      console.log(`Password: ${originalUser?.password}`);
      console.log(`Campus: ${user.campus}`);
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✅ Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    await disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();
