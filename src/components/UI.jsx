import React from 'react';
import clsx from 'clsx';

/**
 * Button Component
 */
export const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      loading = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500',
      outline:
        'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800',
      ghost:
        'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        {...props}
      >
        {loading && <span className="mr-2 animate-spin">⟳</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Card Component
 */
export const Card = ({ children, className, ...props }) => (
  <div
    className={clsx(
      'bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 transition-shadow hover:shadow-lg',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

/**
 * Input Component
 */
export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={clsx(
      'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';

/**
 * Textarea Component
 */
export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={clsx(
      'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical',
      className
    )}
    {...props}
  />
));

Textarea.displayName = 'Textarea';

/**
 * Modal Component
 */
export const Modal = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={clsx(
        'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4',
        className
      )}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/**
 * Loading Spinner Component
 */
export const Spinner = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={clsx('animate-spin', sizes[size], className)}>
      <svg className="w-full h-full text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.1"></circle>
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0110 10h-2a8 8 0 00-8-8V2z"
        ></path>
      </svg>
    </div>
  );
};

/**
 * Badge Component
 */
export const Badge = ({ children, variant = 'gray', className }) => {
  const variants = {
    gray: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    blue: 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    green: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200',
    red: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200',
    yellow: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  return (
    <span className={clsx('inline-block px-2 py-1 text-xs font-semibold rounded-full', variants[variant], className)}>
      {children}
    </span>
  );
};

/**
 * Alert Component
 */
export const Alert = ({ type = 'info', title, message, onClose, className }) => {
  const typeStyles = {
    info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200',
    success: 'bg-green-50 border-l-4 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-400 dark:text-green-200',
    warning: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-400 dark:text-yellow-200',
    error: 'bg-red-50 border-l-4 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-400 dark:text-red-200',
  };

  return (
    <div className={clsx('p-4 rounded-md fade-in', typeStyles[type], className)}>
      <div className="flex items-start justify-between">
        <div>
          {title && <h4 className="font-semibold">{title}</h4>}
          {message && <p className="text-sm mt-1">{message}</p>}
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-inherit hover:opacity-70">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Skeleton Loader Component
 */
export const Skeleton = ({ width = 'w-full', height = 'h-4', className }) => (
  <div
    className={clsx('bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse', width, height, className)}
  ></div>
);

/**
 * Progress Bar Component
 */
export const ProgressBar = ({ value = 0, max = 100, showLabel = true, className }) => {
  const percentage = (value / max) * 100;

  return (
    <div className={clsx('w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden', className)}>
      <div
        className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
      {showLabel && (
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-2">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

/**
 * Divider Component
 */
export const Divider = ({ label, className }) => (
  <div className={clsx('flex items-center gap-4 my-6', className)}>
    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
    {label && <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>}
    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
  </div>
);

/**
 * Tabs Component
 */
export const Tabs = ({ tabs, activeTab, onTabChange, className }) => (
  <div className={clsx('border-b border-gray-200 dark:border-gray-700', className)}>
    <div className="flex gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'py-3 px-1 font-medium border-b-2 transition-colors',
            activeTab === tab.id
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

/**
 * Dropdown Component
 */
export const Select = React.forwardRef(({ options, className, ...props }, ref) => (
  <select
    ref={ref}
    className={clsx(
      'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
      className
    )}
    {...props}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
));

Select.displayName = 'Select';

/**
 * Label Component
 */
export const Label = ({ htmlFor, children, required = false, className }) => (
  <label htmlFor={htmlFor} className={clsx('block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1', className)}>
    {children}
    {required && <span className="text-red-600 ml-1">*</span>}
  </label>
);

/**
 * Form Group Component
 */
export const FormGroup = ({ label, error, required, children, className }) => (
  <div className={clsx('mb-4', className)}>
    {label && <Label required={required}>{label}</Label>}
    {children}
    {error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>}
  </div>
);
