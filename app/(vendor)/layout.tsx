export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Vendor-specific layout (header, sidebar, etc.) will go here */}
      {children}
    </div>
  );
}
