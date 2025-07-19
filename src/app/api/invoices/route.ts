import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/mongodb';
import Invoice from '@/models/Invoice';

export async function GET() {
  await connectDB();
  const invoices = await Invoice.find();
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const invoice = await Invoice.create(data);
  return NextResponse.json(invoice, { status: 201 });
}