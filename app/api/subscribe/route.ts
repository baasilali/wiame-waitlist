import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Helper function to format private key
const formatPrivateKey = (key: string | undefined) => {
  if (!key) return undefined;
  // Handle both local and Vercel environments
  return key.replace(/\\n/g, '\n').replace(/"/g, '');
};

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: formatPrivateKey(process.env.GOOGLE_SHEETS_PRIVATE_KEY),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Attempting to write to sheet:', process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A1:B1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[email, new Date().toISOString()]],
      },
    });

    console.log('Write successful:', response.data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      errors: error.errors,
      config: error.config
    });
    return NextResponse.json(
      { error: 'Failed to add email to sheet' },
      { status: 500 }
    );
  }
} 