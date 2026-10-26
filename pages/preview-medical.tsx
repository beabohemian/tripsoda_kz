import type { GetServerSideProps } from "next";
import Home from "./index";

export default function MedicalPreview() {
  return <Home medical initialLanguage="kk" preview />;
}

// Review only on the local development server; never bypass country routing in production.
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (process.env.NODE_ENV !== "development") return { notFound: true };
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  return { props: {} };
};
