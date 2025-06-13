import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; assignmentId: string } }
) {
  try {
    const { courseId, assignmentId } = params;
    const submission = await request.json();
    const userId = request.headers.get('x-user-id'); // Get user ID from headers

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 401 }
      );
    }

    // Get the assignment and its level
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        level: true,
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { message: 'Assignment not found' },
        { status: 404 }
      );
    }

    // TODO: Add your assignment validation logic here
    // For now, we'll just mark it as passed
    const isPassed = true;

    // Update the assignment status
    await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
        isSubmitted: true,
        isPassed,
      },
    });

    if (isPassed) {
      // Get the next level
      const nextLevel = await prisma.level.findFirst({
        where: {
          courseId,
          order: assignment.level.order + 1,
        },
        include: {
          parts: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });

      // Get user progress
      const userProgress = await prisma.userProgress.findFirst({
        where: { courseId },
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
            completedLevels: assignment.levelId.toString(),
            completedParts: nextLevel.parts[0].id.toString(),
          },
          update: {
            currentLevel: nextLevel.id,
            currentPart: nextLevel.parts[0].id,
            completedLevels: userProgress?.completedLevels 
              ? `${userProgress.completedLevels},${assignment.levelId}`
              : assignment.levelId.toString(),
            completedParts: userProgress?.completedParts
              ? `${userProgress.completedParts},${nextLevel.parts[0].id}`
              : nextLevel.parts[0].id.toString(),
          },
        });
      } else {
        // If this was the last level, mark it as completed
        await prisma.level.update({
          where: { id: assignment.levelId },
          data: { isCompleted: true },
        });
      }
    }

    return NextResponse.json({
      message: 'Assignment submitted successfully',
      isPassed,
    });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 