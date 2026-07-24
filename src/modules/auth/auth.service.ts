import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../errors/AppError.js";
import { generateToken } from "../../utils/jwt.js";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

const register = async (payload: RegisterPayload) => {
  const { name, email, password } = payload;

  // 1. Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
   //throw new AppError("Email already exists", 409);
   throw new AppError("User not found", 404);
  // throw new Error("Email already exists");
  
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // 4. Return safe data
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};


//login code

const login = async (payload: {
  email: string;
  password: string;
}) => {

  const { email, password } = payload;

  // 1. Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }


  // 2. Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );


  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  // 3. Return safe user data (temporary)
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const authService = {
  register,
  login,
};