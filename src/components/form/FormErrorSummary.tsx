import { useEffect, useRef } from 'react';
import type { FieldErrors } from 'react-hook-form';

import ErrorSummary from '@/ui/error-summary/error-summary';

type FormErrorSummaryProps<T extends object> = {
  errors: FieldErrors<T>;
  fieldOrder?: (keyof T)[];
};

const FormErrorSummary = <T extends object>({ errors, fieldOrder }: FormErrorSummaryProps<T>) => {
  const entries = Object.entries(errors);
  const originalTitleRef = useRef<string | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasErrors = entries.length > 0;

    if (hasErrors) {
      // Store original title on first error (remove "Error: " prefix if present)
      if (originalTitleRef.current === null) {
        const currentTitle = document.title;
        originalTitleRef.current = currentTitle.startsWith('Error: ')
          ? currentTitle.slice(7) // Remove "Error: " prefix
          : currentTitle;
      }

      // Only add "Error: " if it's not already there
      if (!document.title.startsWith('Error: ')) {
        document.title = `Error: ${originalTitleRef.current}`;
      }
    } else {
      // Restore original title when no errors
      if (originalTitleRef.current !== null) {
        document.title = originalTitleRef.current;
        originalTitleRef.current = null;
      }
    }

    // Cleanup: restore original title when component unmounts
    return () => {
      if (originalTitleRef.current !== null) {
        document.title = originalTitleRef.current;
      }
    };
  }, [entries.length]);

  // Focus the first link when errors are present
  useEffect(() => {
    if (entries.length > 0 && errorSummaryRef.current) {
      // Find the first anchor element within the error summary
      const firstLink = errorSummaryRef.current.querySelector<HTMLAnchorElement>('a[href]');
      if (firstLink) {
        // Use setTimeout to ensure the DOM is fully rendered
        setTimeout(() => {
          firstLink.focus();
        }, 0);
      }
    }
  }, [entries.length]);

  if (!entries.length) {
    return null;
  }

  // Sort errors deterministically: by fieldOrder if provided, otherwise alphabetically
  // Root errors always go to the end
  const sortedEntries = entries.sort(([keyA], [keyB]) => {
    // Handle root errors - always put them at the end
    if (keyA === 'root') {
      return 1;
    }
    if (keyB === 'root') {
      return -1;
    }

    // If fieldOrder is provided, use it to determine order
    if (fieldOrder) {
      const indexA = fieldOrder.indexOf(keyA as keyof T);
      const indexB = fieldOrder.indexOf(keyB as keyof T);

      // If both fields are in the order, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // If only one is in the order, prioritize it
      if (indexA !== -1) {
        return -1;
      }
      if (indexB !== -1) {
        return 1;
      }
    }

    // Fallback to alphabetical sorting
    return keyA.localeCompare(keyB);
  });

  const errorList = sortedEntries.map(([key, value]) => ({
    href: key !== 'root' ? `#${key}` : undefined,
    children: value.message || '',
  }));

  return (
    <div ref={errorSummaryRef}>
      <ErrorSummary errorList={errorList} />
    </div>
  );
};

export { FormErrorSummary };
