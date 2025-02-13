const Scrollable = ({ children }: { children: React.ReactNode }) => {
  return <div className="overflow-auto max-h-[400px]">{children}</div>;
};

export { Scrollable };
