'use client';

export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-gray-100">
      <h1 className="text-9xl font-bold text-primary">502</h1>
      <p className="text-4xl font-extrabold text-gray-800">
        Something went wrong
      </p>
    </div>
  );
}
