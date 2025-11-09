import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/logos/survd-logo.png"
            alt="Survd"
            width={150}
            height={50}
            className="h-12 w-auto mx-auto"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
