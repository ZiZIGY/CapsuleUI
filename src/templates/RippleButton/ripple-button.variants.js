export const rippleButtonVariants = {
  base: `inline-flex
        disabled:pointer-events-none
        disabled:opacity-50 relative overflow-hidden select-none
  `,
  size: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  variant: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-400 text-gray-900 bg-transparent',
  },
  default: {
    size: 'md',
    variant: 'primary',
  },
};
