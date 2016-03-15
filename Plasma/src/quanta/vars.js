const mod = (color, lum) => {
  color = new String(color).replace(/[^0-9a-f]/gi, '');
	if (color.length < 6) {
		color = color[0]+ color[0]+ color[1]+ color[1]+ color[2]+ color[2];
	}

	let newColor = "#", c, i

	for (i = 0; i < 3; i++) {
		c = parseInt(color.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (lum * 255)), 255)).toString(16);
		newColor += ("00"+c).substr(c.length);
	}

	return newColor;
}


export const font = 'Raleway'
export const dark = '#292F36'
export const light = '#F7FFF7'
export const primary = '#4ECDC4'
export const secondary = '#FF6B6B'
export const highlight = '#FFE66D'

export const border = 'rgb(177, 177, 177)'

export const dimPrimary = mod(primary, -0.05)
export const dimSecondary = mod(secondary, -0.05)

export const darkPrimary = mod(primary, -0.1)
export const darkSecondary = mod(secondary, -0.1)

export const positive = '#3BBD3B'
export const negative = '#FFA0A0'
