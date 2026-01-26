import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "Banglar Chaka",
  description: "Banglar Chaka - The marketplace for everything from household items and cars to homes, jobs, and services.",
};

export default function ProtectedLayout({ children }) {
  return (
    <LayoutWrapper>{children}</LayoutWrapper>
  );
}
