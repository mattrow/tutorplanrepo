export default function LoadingSpinner() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-2rem)] p-8">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-[#396afc] border-t-transparent"></div>
      </div>
    </div>
  );
}
