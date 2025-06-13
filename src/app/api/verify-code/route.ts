import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const CODES_FILE = path.join(process.cwd(), 'src/data/courseCodes.json');

// Keep track of used codes and device access in memory
const usedCodes = new Set<string>();
const deviceAccess = new Map<string, string>(); // deviceId -> code

// Load valid codes from file
function loadValidCodes(): string[] {
  try {
    const { codes } = JSON.parse(fs.readFileSync(CODES_FILE, 'utf-8'));
    return codes;
  } catch (error) {
    console.error('Error loading codes:', error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, deviceId } = await request.json();

    // Check if device already has access
    if (deviceAccess.has(deviceId)) {
      return NextResponse.json({ message: 'Device already has access' }, { status: 403 });
    }

    // Load current valid codes
    const validCodes = loadValidCodes();

    // Check if code is valid and not used
    if (!validCodes.includes(code) || usedCodes.has(code)) {
      return NextResponse.json({ message: 'Invalid code' }, { status: 401 });
    }

    // Mark code as used and grant device access
    usedCodes.add(code);
    deviceAccess.set(deviceId, code);

    return NextResponse.json({ message: 'Access granted' });
  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const deviceId = request.headers.get('x-device-id');
    if (!deviceId) {
      return NextResponse.json({ message: 'Device ID required' }, { status: 401 });
    }

    // Check if device has access
    if (!deviceAccess.has(deviceId)) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({ message: 'Access granted' });
  } catch (error) {
    console.error('Error checking access:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 