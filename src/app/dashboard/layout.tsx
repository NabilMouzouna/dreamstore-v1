import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "manage products, orders and users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
