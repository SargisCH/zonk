import { FallbackProps } from "react-error-boundary";
import React from "react";

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
export default ErrorFallback;
