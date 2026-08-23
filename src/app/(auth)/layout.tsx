export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-kpalime-sand/30">
      <div className="w-full max-w-md animate-slide-up">
        {children}
      </div>
    </div>
  );
}
