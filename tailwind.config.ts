import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				alchemy: {
					purple: {
						DEFAULT: '#9b87f5',
						dark: '#6E59A5',
						light: '#D6BCFA',
						deep: '#1A1F2C',
					},
					blue: {
						DEFAULT: '#33C3F0',
						dark: '#0FA0CE',
						royal: '#1EAEDB',
					},
					green: {
						DEFAULT: '#8B5CF6',
						emerald: '#10B981',
						teal: '#14B8A6',
					},
				}
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.9' },
					'50%': { opacity: '1' }
				},
				'text-shimmer': {
					'0%': { backgroundPosition: '200% 0' },
					'100%': { backgroundPosition: '-200% 0' }
				},
				'spin-slow': {
					'from': { transform: 'rotate(0deg)' },
					'to': { transform: 'rotate(360deg)' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'subtle-pulse': {
					'0%, 100%': { opacity: '0.15' },
					'50%': { opacity: '0.25' }
				},
				'geometric-pulse': {
					'0%, 100%': { opacity: '0.1', transform: 'scale(1)' },
					'50%': { opacity: '0.2', transform: 'scale(1.05)' }
				},
				'geometric-spin': {
					'0%': { transform: 'rotate(0)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'geometric-rotate': {
					'0%': { transform: 'rotate(0)' },
					'100%': { transform: 'rotate(90deg)' }
				},
				'geometric-morph': {
					'0%, 100%': { opacity: '0.1' },
					'50%': { opacity: '0.2', strokeDasharray: '0' },
					'75%': { strokeDasharray: '10' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gradient-shift': 'gradient-shift 15s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
				'text-shimmer': 'text-shimmer 8s infinite linear',
				'spin-slow': 'spin-slow 20s linear infinite',
				'float-slow': 'float-slow 6s ease-in-out infinite',
				'subtle-pulse': 'subtle-pulse 8s ease-in-out infinite',
				'geometric-pulse': 'geometric-pulse 10s ease-in-out infinite',
				'geometric-spin': 'geometric-spin 20s linear infinite',
				'geometric-rotate': 'geometric-rotate 15s linear infinite',
				'geometric-morph': 'geometric-morph 15s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
