interface LoaderProps {
  message?: string;
}

const Loader = ({ message = "Loading, please wait..." }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>

      <p className="mt-4 text-sm text-gray-500 font-medium">{message}</p>
    </div>
  );
};

export default Loader;
