export default function LoadingSpinner() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-2rem)] p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#396afc]"></div>
    </div>
  );
}
