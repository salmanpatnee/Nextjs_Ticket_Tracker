import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createTicketSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255),
    description: z.string().min(1, 'Description is required.'),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});


export const POST = async (request: NextRequest) => {
    const body = await request.json();

    const validation = createTicketSchema.safeParse(body);

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