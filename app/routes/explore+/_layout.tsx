import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useMemo, useState } from "react";
import { apiGetMeInfos } from "~/@api/routes/me.api";
import { HeaderSection } from "~/components/layout/headerSection";
import { getUserSession } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionData = await getUserSession(request)
  if(!sessionData){
    return json({user: null})
  }
  
  const userRecord = await apiGetMeInfos(sessionData.token)
  if('err' in userRecord){
    console.log(userRecord.err.data)
    return json({user: null})
  }

  return json({
    user: userRecord
  })
} 

export default function Layout() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="w-screen h-screen grid grid-rows-[72px_1fr] justify-items-center gap-6">
        <HeaderSection
          user={user}
        />

        <div className="w-full overflow-y-auto">
          <main className="w-screen max-w-[1440px] container mx-auto px-4 py-8 flex flex-col items-center">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
