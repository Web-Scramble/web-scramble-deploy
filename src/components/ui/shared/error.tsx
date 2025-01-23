import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { XCircle, AlertCircle, Bug } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ErrorProps {
  title?: string;
  message: string;
  type?: 'error' | 'warning' | 'api' | 'validation';
  className?: string;
  retry?: () => void;
}

export const ErrorDisplay = ({ 
  title, 
  message, 
  type = 'error',
  className,
  retry 
}: ErrorProps) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'api':
        return <Bug className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'error':
        return 'An error occurred';
      case 'warning':
        return 'Warning';
      case 'api':
        return 'API Error';
      case 'validation':
        return 'Validation Error';
      default:
        return 'Error';
    }
  };

  return (
    <Alert 
      variant="destructive" 
      className={cn(
        'border-l-4',
        "w-1/2",
        {
          'border-l-red-500 bg-red-50': type === 'error',
          'border-l-yellow-500 bg-yellow-50': type === 'warning',
          'border-l-blue-500 bg-blue-50': type === 'api',
          'border-l-gray-500 bg-gray-50': type === 'validation'
        },
        className
      )}
    >
      <div className="flex items-start  gap-4">
        {getIcon()}
        <div className="flex-1">
          <AlertTitle className="text-lg font-semibold">
            {title || getDefaultTitle()}
          </AlertTitle>
          <AlertDescription className="mt-2 text-sm">
            {message}
          </AlertDescription>
          {retry && (
            <button
              onClick={retry}
              className="mt-4 text-sm font-medium underline hover:text-gray-900"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </Alert>
  );
};

// Preview of different error types
// const ErrorPreview = () => {
//   return (
//     <div className="space-y-4 p-4">
//       <ErrorDisplay
//         type="error"
//         message="Something went wrong while processing your request."
//       />
//       <ErrorDisplay
//         type="warning"
//         message="Your session will expire in 5 minutes."
//       />
//       <ErrorDisplay
//         type="api"
//         message="Failed to fetch data from the server. Please check your connection."
//         retry={() => console.log('Retrying...')}
//       />
//       <ErrorDisplay
//         type="validation"
//         message="Please check the form for errors and try again."
//       />
//     </div>
//   );
// };