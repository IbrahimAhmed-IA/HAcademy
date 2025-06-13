import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; partId: string } }
) {
  try {
    const { courseId, partId } = params;
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 401 }
      );
    }

    // Get the part and its level
    const part = await prisma.part.findUnique({
      where: { id: partId },
      include: {
        level: true,
      },
    });

    if (!part) {
      return NextResponse.json(
        { message: 'Part not found' },
        { status: 404 }
      );
    }

    // Get user progress
    const userProgress = await prisma.userProgress.findFirst({
      where: { courseId },
    });

    // Get the next part in the current level
    const nextPart = await prisma.part.findFirst({
      where: {
        levelId: part.levelId,
        order: part.order + 1,
      },
    });

    if (nextPart) {
      // If there's a next part in the current level, update progress to that part
      await prisma.userProgress.upsert({
        where: {
          id: userProgress?.id || '',
        },
        create: {
          userId,
          courseId,
          currentLevel: part.levelId,
          currentPart: nextPart.id,
          completedParts: partId,
          completedLevels: '',
        },
        update: {
          currentPart: nextPart.id,
          completedParts: userProgress?.completedParts 
            ? `${userProgress.completedParts},${partId}`
            : partId,
        },
      });
    } else {
      // If this was the last part in the level, check if there's a next level
      const nextLevel = await prisma.level.findFirst({
        where: {
          courseId,
          order: part.level.order + 1,
        },
        include: {
          parts: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });

      if (nextLevel && nextLevel.parts.length > 0) {
        // If there's a next level with parts, update progress to the first part of that level
        await prisma.userProgress.upsert({
          where: {
            id: userProgress?.id || '',
          },
          create: {
            userId,
            courseId,
            currentLevel: nextLevel.id,
            currentPart: nextLevel.parts[0].id,
            completedParts: partId,
            completedLevels: part.levelId,
          },
          update: {
            currentLevel: nextLevel.id,
            currentPart: nextLevel.parts[0].id,
            completedParts: userProgress?.completedParts 
              ? `${userProgress.completedParts},${partId}`
              : partId,
            completedLevels: userProgress?.completedLevels 
              ? `${userProgress.completedLevels},${part.levelId}`
              : part.levelId,
          },
        });
      } else {
        // If this was the last part of the last level, mark the level as completed
        await prisma.level.update({
          where: { id: part.levelId },
          data: { isCompleted: true },
        });
      }
    }

    return NextResponse.json({ message: 'Part completed successfully' });
  } catch (error) {
    console.error('Error completing part:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 