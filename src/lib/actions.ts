'use server';

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getTodayIST } from "@/lib/timezone";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Missing fields" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STUDENT", // Default role
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong" };
  }
}

export async function getTasks(userId: string) {
  const today = getTodayIST();

  // Rollover logic: Find incomplete tasks from before today and update them to today
  await prisma.task.updateMany({
    where: {
      userId,
      isCompleted: false,
      date: {
        lt: today,
      },
    },
    data: {
      date: today,
    },
  });

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      date: today,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return tasks;
}

export async function addTask(userId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const date = getTodayIST(); // Default to today (IST)

  if (!title) return;

  await prisma.task.create({
    data: {
      title,
      userId,
      date,
    },
  });

  revalidatePath("/study-planner");
}

export async function toggleTask(taskId: string, isCompleted: boolean) {
  await prisma.task.update({
    where: { id: taskId },
    data: { isCompleted },
  });

  revalidatePath("/study-planner");
}

export async function deleteTask(taskId: string) {
  await prisma.task.delete({
    where: { id: taskId },
  });

  revalidatePath("/study-planner");
}

export async function updateTask(taskId: string, title: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { title },
  });

  revalidatePath("/study-planner");
}

export async function getAllUsersWithTasks() {
  return await prisma.user.findMany({
    where: {
      role: "STUDENT",
    },
    include: {
      tasks: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });
}

export async function getCompletedTasks(userId: string) {
  const today = getTodayIST();

  return await prisma.task.findMany({
    where: {
      userId,
      isCompleted: true,
      date: {
        lt: today,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
}
