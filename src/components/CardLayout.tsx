import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CardLayoutProps {
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
  title: string;
  description?: string;
  badge?: string;
  showCheckmark?: boolean;
  children?: React.ReactNode;
  style?: any;
  className?: string;
}

export function CardLayout({
  selected = false,
  onPress,
  icon,
  title,
  description,
  badge,
  showCheckmark = true,
  children,
  style,
  className
}: CardLayoutProps) {
  const Component = onPress ? Pressable : View;
  const baseClassName = selected 
    ? "border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4" 
    : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4";
  
  return (
    <Component 
      onPress={onPress} 
      className={className || baseClassName}
      style={style}
    >
      <View className="flex-row items-start gap-3">
        {icon && (
          <View style={{ flexShrink: 0 }}>
            <Ionicons name={icon as any} size={24} color={selected ? "#2563eb" : "#6b7280"} />
          </View>
        )}
        
        <View className="flex-1" style={{ minWidth: 0 }}>
          <View className="flex-row items-center gap-2 mb-1" style={{ flexWrap: 'wrap' }}>
            <Text 
              className={selected ? "text-blue-900 dark:text-blue-100 font-semibold" : "text-gray-900 dark:text-gray-100 font-semibold"}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ flex: 1, minWidth: 100 }}
            >
              {title}
            </Text>
            {badge && (
              <View className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full" style={{ flexShrink: 0 }}>
                <Text className="text-orange-800 dark:text-orange-200 text-xs font-medium">{badge}</Text>
              </View>
            )}
          </View>
          
          {description && (
            <Text 
              className={selected ? "text-blue-700 dark:text-blue-300 text-sm" : "text-gray-600 dark:text-gray-400 text-sm"}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          )}
          
          {children}
        </View>
        
        {selected && showCheckmark && (
          <View style={{ flexShrink: 0 }}>
            <Ionicons name="checkmark-circle" size={20} color="#2563eb" />
          </View>
        )}
      </View>
    </Component>
  );
}

interface FlexRowProps {
  children: React.ReactNode;
  justify?: 'start' | 'between' | 'center' | 'end';
  align?: 'start' | 'center' | 'end';
  wrap?: boolean;
  gap?: number;
  style?: any;
  className?: string;
}

export function FlexRow({ 
  children, 
  justify = 'start', 
  align = 'center', 
  wrap = false, 
  gap = 8,
  style,
  className 
}: FlexRowProps) {
  const justifyContent = {
    start: 'flex-start',
    between: 'space-between',
    center: 'center',
    end: 'flex-end'
  }[justify];
  
  const alignItems = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end'
  }[align];
  
  return (
    <View 
      className={className}
      style={{
        flexDirection: 'row',
        justifyContent,
        alignItems,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap,
        ...style
      }}
    >
      {children}
    </View>
  );
}

interface TwoColumnGridProps {
  children: React.ReactNode;
  gap?: number;
  style?: any;
  className?: string;
}

export function TwoColumnGrid({ children, gap = 12, style, className }: TwoColumnGridProps) {
  const childArray = React.Children.toArray(children);
  
  return (
    <View 
      className={className}
      style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap,
        ...style 
      }}
    >
      {childArray.map((child, index) => (
        <View key={index} style={{ width: '48%' }}>
          {child}
        </View>
      ))}
    </View>
  );
}