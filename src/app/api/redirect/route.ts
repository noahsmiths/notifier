import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
    redirect(request.nextUrl.searchParams.get('url') ?? '/');
}