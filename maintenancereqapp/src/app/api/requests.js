// app/api/requests.js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(maintenanceRequests);
}

export async function PATCH(request) {
  const { id, status } = await request.json();
  const requestToUpdate = maintenanceRequests.find(req => req.id === id);

  if (requestToUpdate) {
    requestToUpdate.status = status;
    return NextResponse.json(requestToUpdate);
  } else {
    return NextResponse.json({ message: 'Request not found' }, { status: 404 });
  }
}