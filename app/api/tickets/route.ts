import { ticketSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
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