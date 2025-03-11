import {
  createCookieSessionStorage,
  createSessionStorage,
  json,
  redirect,
} from "@remix-run/node";
import { SessionType } from "~/@types/session.types";


export const USER_SESSION_KEY = "userId";
export const USER_DEVICE_KEY = "userDevice";
export const USER_ADDRESS_KEY = "userIpAddress";

/**
 * TODO: Add zod validation on session storage CRUD

*/

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [`${process.env.SESSION_SECRET || 'secret'}`],
    secure: false, // Desative o `secure` para testes locais sem HTTPS
  },
});


async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/auth/login", {
      headers: {
          "Set-Cookie": await sessionStorage.destroySession(session),
      },
  });
}


export async function createUserSession({
  request,
  data
}: {
  request: Request,
  data: SessionType
}){
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, data);
  return redirect("/", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 7 // 7 days,
        }),
      },
  });
}

export async function getUserSession(
  request: Request
): Promise<SessionType | undefined> {
  const session = await getSession(request);
  const user:SessionType = session.get(USER_SESSION_KEY);
  return user;
}


export async function requireUserSession(
  request: Request,
) {
  const user = await getUserSession(request);
  if (!user) {
    throw redirect('/auth/login');
  }
  return user;
}

/*
export async function requireAdminSession(
request: Request,
) {
const user = await getUserSession(request);
if (!user) {
  throw redirect('/auth/login');
}

if(user.elo != 'admin') {
  throw redirect('/dashboard');
}
return user;
}
*/