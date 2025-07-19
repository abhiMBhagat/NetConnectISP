import { connectToDatabase } from '@/lib/mongodb';
// Update the path below if your User model is located elsewhere
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function validateUser(email: string, password: string, role: string) {
  await connectToDatabase();

  // Dummy validation: allow login if email === password
  // if (email && password && email === password && (role === 'customer' || role === 'staff')) {
  //   return { email, role };
  // }

  const user = await User.findOne({ email, role });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return { email: user.email, role: user.role };
}
