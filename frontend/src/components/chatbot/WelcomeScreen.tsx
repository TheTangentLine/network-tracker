export const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h1 className="mt-4 text-2xl font-semibold text-gray-800">
        How can I help you today?
      </h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl"></div>
    </div>
  );
};
