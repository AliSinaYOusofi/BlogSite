import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
export default async function middleware(req){
   
    const pathname = req.nextUrl.clone().pathname;
    
    if ((pathname.startsWith("/api") && pathname.startsWith("/login") && pathname.startsWith("/signup"))) {
        const accessToken = req.headers.get("authorization")?.split(" ")[1];
        
        if (accessToken) {
            try {
                const secretEncoded = new TextEncoder().encode(process.env.JWT_SECRET);
                await jose.jwtVerify(accessToken, secretEncoded);
                return NextResponse.next();
            } catch(error) {
                const url = req.nextUrl.clone();
                url.pathname = "/login";
                return NextResponse.redirect(url.href);
            }
        } 
    }
    return NextResponse.next(); // redirect to login. pending ... .
}
