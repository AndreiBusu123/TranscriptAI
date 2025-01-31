export const theme = {
  colors: {
    background: {
      main: '#0F172A',      // Deep navy blue
      card: '#1E293B',      // Lighter navy
      sidebar: '#1E293B',   // Lighter navy
      hover: '#334155',     // Medium slate
      active: '#2563EB',    // Bright blue
      aiMessage: '#2D3748', // Dark slate
      userMessage: '#1E40AF' // Deep blue
    },
    text: {
      primary: '#F8FAFC',   // Almost white
      secondary: '#94A3B8', // Muted gray
      disabled: '#64748B'   // Darker gray
    },
    accent: {
      primary: '#3B82F6',   // Vibrant blue
      secondary: '#60A5FA', // Lighter blue
      success: '#10B981'    // Emerald
    },
    border: {
      divider: '#334155',   // Medium slate
      input: '#475569',     // Gray slate
      focus: '#3B82F6'      // Vibrant blue
    }
  }
} as const;