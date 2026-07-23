export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[1400px] px-6 sm:px-11 ${className}`}>
      {children}
    </div>
  );
}
