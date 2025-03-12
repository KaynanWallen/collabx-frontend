import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({})
}

export default function Layout(){
  return (
    <>
      <Outlet />
    </>
  )
}