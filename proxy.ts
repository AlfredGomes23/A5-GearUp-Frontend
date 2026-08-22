import { NextRequest, NextResponse } from 'next/server';
import React from 'react';

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)', // don't protect this route
    ]
};

const proxy = async (request: NextRequest) => {
    const pathName = request?.nextUrl?.pathname;
    console.log(pathName);

    //forward to next
    return NextResponse.next();
};

export default proxy;