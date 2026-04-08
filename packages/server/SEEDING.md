# Database Seeding Guide

This script populates your MongoDB database with sample users and news articles.

## Prerequisites

1. MongoDB must be running:
   ```bash
   docker-compose up -d
   ```

2. Dependencies must be installed:
   ```bash
   yarn install
   ```

## Running the Seed Script

Run the seed script from the root directory:

```bash
cd packages/server
yarn seed
```

Or from the root:

```bash
yarn seed:server
```

## What Gets Seeded

### Sample Users (6 users)

The script creates various user accounts for testing:

#### Admin & Staff Users:
1. **Dr. Jean Pierre Mwenge** (Staff - Computer Science)
   - Reg: 20000001
   - Password: `SecurePass123!`
   - Role: Staff

2. **Prof. Alice Nyiraneza** (Staff - Business)
   - Reg: 20000002
   - Password: `SecurePass123!`
   - Role: Staff

3. **Admin User** (System Admin)
   - Reg: 20000003
   - Password: `AdminPass123!`
   - Role: Admin

#### Student Users:
4. **Emmanuel Akiyimpa** (Engineering)
   - Reg: 21234567
   - Password: `StudentPass123!`
   - Year: 3

5. **Grace Uwase** (Journalism)
   - Reg: 21234568
   - Password: `StudentPass123!`
   - Year: 2

6. **David Mukiza** (Economics)
   - Reg: 21234569
   - Password: `StudentPass123!`
   - Year: 1

### Sample News (12 articles)

The script creates 12 realistic news articles covering:

- **AI and Data Science Research Center Launch** - College of Science & Technology
- **Business Entrepreneurship Summit 2026** - College of Business & Economics
- **Robotics Competition Victory** - School of Engineering
- **Community Health Initiative** - College of Medicine
- **Sustainable Agriculture Research Lab** - College of Agriculture
- **Journalism Students Win Media Awards** - School of Journalism
- **Scholarship Program Announcement** - University-wide
- **Solar Energy Installation Project** - University-wide
- **Cybersecurity Certification Program** - School of ICT
- **Library Digital Transformation** - University-wide
- **Moot Court Competition** - School of Law
- **New Student Center Inauguration** - University-wide

Each article includes:
- Realistic title and description
- High-quality images from Unsplash (free stock photos)
- Target college/school
- Public status
- Random creator from the sample users

## Database Structure

After seeding:

### Users Collection
- 6 sample users with hashed passwords
- Realistic academic data
- Different roles (student, staff, admin)

### News Collection
- 12 sample articles
- Linked to different creators
- Diverse content covering all colleges

## Clearing Data

To clear all data and reseed:

```bash
# This will run automatically when you run the seed script
# It deletes all existing users and news before inserting new data
yarn seed
```

Or manually from MongoDB:

```bash
# Using Mongo Express: http://localhost:8081
# Or using MongoDB CLI:
mongosh mongodb://root:password@localhost:27017/ur-news?authSource=admin
> use ur-news
> db.users.deleteMany({})
> db.news.deleteMany({})
```

## Testing in the Application

After seeding, you can test login with any of the user accounts:

### Web Application (http://localhost:3000)
Sign in with:
- **Reg Number**: 20000001 (or any other reg number from above)
- **Password**: SecurePass123! (for staff) or StudentPass123! (for students)

### MongoDB GUI (http://localhost:8081)
- URL: http://localhost:8081
- Username: admin
- Password: admin

View the data in:
- `ur-news` > `users` collection
- `ur-news` > `news` collection

## Customizing the Seed Data

To add or modify seed data, edit `packages/server/src/seeds/seed.ts`:

1. Edit the `sampleNews` array to add/modify news articles
2. Edit the `sampleUsers` array to add/modify users
3. Run `yarn seed` again to reseed the database

### Adding a New News Article:

```javascript
{
  title: 'Your News Title',
  description: 'Detailed description of the news...',
  img: 'https://your-image-url.jpg', // Public image URL
  status: 'public', // or 'private'
  target: 'CST', // College/School code
  targetType: 'campus', // or 'university'
}
```

### Adding a New User:

```javascript
{
  name: 'Student Name',
  campus: 'Kigali',
  school: 'SICT', // School code
  department: 'Computer Science',
  class: 'Year 1',
  role: 'student', // or 'staff', 'admin'
  regNumber: 21234570,
  password: 'YourPassword123!',
}
```

## Available Image URLs

The seed script uses free images from Unsplash. For your own news, you can:

1. **Use Unsplash** - https://unsplash.com (most images are free to use)
2. **Use Placeholder Services**:
   - https://via.placeholder.com/800x600?text=Your+Text
   - https://picsum.photos/800/600
3. **Use Cloudinary** - Upload images to your Cloudinary account for production

## Troubleshooting

### MongoDB Connection Error
```
Error: Error connecting to MongoDB
```
Solution:
```bash
docker-compose ps  # Check if MongoDB is running
docker-compose up -d  # Start MongoDB if not running
```

### Port Already in Use
```
Port 27017 already in use
```
Solution:
```bash
docker-compose down  # Stop containers
docker-compose up -d  # Restart
```

### Seed Script Hangs
Check if:
- MongoDB is running: `docker-compose ps`
- Connection string in `.env` is correct
- Run: `docker-compose logs mongodb` to see logs

## Notes

- Passwords are hashed using bcryptjs before storage
- Reg numbers must follow the pattern: `2XXXXXXX` (7 digits after 2)
- News titles must be unique
- Images are loaded from Unsplash (no authentication needed)
- The seed script automatically clears old data before inserting new data
