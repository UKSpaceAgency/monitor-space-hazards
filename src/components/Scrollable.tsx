const Scrollable = ({ children }: { children: React.ReactNode }) => {
  return <div className="overflow-auto max-h-[400px] [&>table]:mb-0">{children}</div>;
};

export { Scrollable };
