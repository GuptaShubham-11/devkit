function Point({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-text-primary mb-1 font-medium tracking-wide">
        {title}
      </h2>
      <p className="text-lg">{children}</p>
    </div>
  );
}

export { Point };
