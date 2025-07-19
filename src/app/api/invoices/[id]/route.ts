import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/mongodb';
import Invoice from '@/models/Invoice';

// GET a single invoice by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = await params;
  const invoice = await Invoice.findById(id);
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  return NextResponse.json(invoice);
}

// UPDATE an invoice by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const { id } = await params;
  const invoice = await Invoice.findByIdAndUpdate(id, data, { new: true });
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  return NextResponse.json(invoice);
}

// DELETE an invoice by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = await params;
  const invoice = await Invoice.findByIdAndDelete(id);
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  return NextResponse.json({ message: 'Invoice deleted' });
}
