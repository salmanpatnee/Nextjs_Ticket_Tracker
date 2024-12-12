import authOptions from "@/app/auth/authOptions";
import { ticketSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {

    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({}, { status: 401 });     
    }

    const body = await request.json();

    const validation = ticketSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    try {
        const newTicket = await prisma.ticket.create({
            data: {
                title: body.title,
                description: body.description,
                priority: body.priority,
            },
        });

        return NextResponse.json(newTicket, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
    }
};