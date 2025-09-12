import { TextStyle } from "react-native";

export const textOverflowStyles = {
  // Standard text overflow protection
  safeText: {
    numberOfLines: 2,
    ellipsizeMode: 'tail' as const,
  },
  
  // Single line text with ellipsis
  singleLine: {
    numberOfLines: 1,
    ellipsizeMode: 'tail' as const,
  },
  
  // Multi-line text with more lines allowed
  multiLine: {
    numberOfLines: 3,
    ellipsizeMode: 'tail' as const,
  },
  
  // Long description text
  description: {
    numberOfLines: 4,
    ellipsizeMode: 'tail' as const,
  },
} as const;

export const flexStyles = {
  // Safe flex container that prevents text overflow
  safeContainer: {
    flex: 1,
    minWidth: 0,
  } as TextStyle,
  
  // Non-shrinking container for icons and fixed elements
  fixedContainer: {
    flexShrink: 0,
  } as TextStyle,
  
  // Safe flex row with proper spacing
  safeRow: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    gap: 12,
  },
  
  // Flex row that wraps when needed
  wrappingRow: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 8,
  },
} as const;

// Utility function to truncate text at a specific length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// Utility function to get safe text props based on content type
export function getSafeTextProps(type: 'title' | 'description' | 'single' | 'multi' = 'description') {
  switch (type) {
    case 'title':
      return textOverflowStyles.safeText;
    case 'single':
      return textOverflowStyles.singleLine;
    case 'multi':
      return textOverflowStyles.multiLine;
    case 'description':
    default:
      return textOverflowStyles.description;
  }
}

// Utility function to create safe flex container styles
export function createSafeContainer(additionalStyles?: any) {
  return {
    ...flexStyles.safeContainer,
    ...additionalStyles,
  };
}

// Utility function to create safe flex row styles
export function createSafeRow(additionalStyles?: any) {
  return {
    ...flexStyles.safeRow,
    ...additionalStyles,
  };
}