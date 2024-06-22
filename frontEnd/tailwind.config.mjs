/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors:{
				transparent: 'transparent',
				'darkBlue' : '#206AC4',
				'ligthBlue' : '#5EAFE8',
				'orange' : '#FF6D00',
				'black': '#1E1E1E',
				'backgroundWhite' : '#F0F4F9',
				'white' : '#FFFFFF',
				'placeholderBlue' : '#D6DEFA',
				'gray' : '#B1B1B1'
			},
			fontSize:{
				'title' : '28px',
				'title2' : '22px',
				'subTitle' : '20px',
				'subTitle2' : '18px',
				'paragraph' :'16px',
				'paragraph2': '14px',
				'paragraph3' : '12px',
				'paragraphSmall' : '8px',
				'button' : '18px',
				'button2' : '15px'
			},
			fontFamily:{
				cocogooseRegular: ['Cocogoose-Regular', 'sans-serif'],
				cocogooseSemiLight : ['Cocogoose-SemiLight', 'sans-serif'],
				cocogooseLight: ['Cocogoose-Light', 'sans-serif'],
				cocogooseUltraLight: ['Cocogoose-UltraLight', 'sans-serif']
			}
		},
	},
	plugins: [],
}
