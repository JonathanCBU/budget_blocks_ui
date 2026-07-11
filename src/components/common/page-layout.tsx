export function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 max-w-sm p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
