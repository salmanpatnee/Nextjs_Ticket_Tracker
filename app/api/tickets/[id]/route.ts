import authOptions from "@/app/auth/authOptions";
import { patchTicketSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchTicketSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!ticket)
    return NextResponse.json({ error: "Invalid ticket" }, { status: 404 });

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedTicket);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket)
    return NextResponse.json({ error: "Invalid ticket" }, { status: 404 });

  await prisma.ticket.delete({
    where: { id: ticket.id },
  });

  return NextResponse.json({});
}
