import authOptions from "@/app/auth/authOptions";
import { ticketSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json(
      { error: "Invalid ticket" },
      {
        status: 404,
      }
    );
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
      priority: body.priority,
    },
  });

  return NextResponse.json(updatedTicket, { status: 200 });
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json(
      { error: "Invalid ticket" },
      {
        status: 404,
      }
    );
  }

  await prisma.ticket.delete({
    where: { id: ticket.id },
  });

  return NextResponse.json({}, { status: 200 });
};
