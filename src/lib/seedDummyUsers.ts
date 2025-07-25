import { connectToDatabase } from './mongodb';
import User, { dummyUsers } from '../models/User';
import bcrypt from 'bcrypt';

async function seed() {
  await connectToDatabase();
  await User.deleteMany({}); // No 'any' usage here
  const usersWithHashedPasswords = await Promise.all(
    dummyUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );
  await User.insertMany(usersWithHashedPasswords); // No 'any' usage here
  console.log('Dummy users seeded');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
}); 