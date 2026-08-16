export const Loader = ({ show, text }: { show: boolean; text: string }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-4 text-center shadow-lg dark:bg-slate-800">
        <p className="text-lg font-medium dark:text-white m-0 flex items-center content-center gap-2">
          {text}
        </p>
      </div>
    </div>
  );
};