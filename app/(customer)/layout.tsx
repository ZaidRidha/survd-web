export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Customer-specific layout (header, navigation, etc.) will go here */}
      {children}
    </div>
  );
}
