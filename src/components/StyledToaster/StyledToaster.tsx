import { Toaster } from 'sonner';

export const StyledToaster = () => (
  <Toaster
    toastOptions={{
      unstyled: true,
      classNames: {
        toast: 'relative cursor-pointer bg-slate-700 text-white shadow-md py-2 px-3.5 rounded-md w-full flex gap-2',
        title: 'font-medium',
        icon: 'mt-1',
        closeButton:
          'absolute top-3 right-0 left-[unset] bg-transparent hover:bg-slate-700 hover:border-0 focus:border-0 focus:outline-0 hover:outline-0 focus:ring-1 focus:ring-slate-400 focus:bg-slate-700 ',
      },
    }}
    closeButton
    position="top-center"
  />
);
