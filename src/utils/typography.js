import Typography from 'typography';
import stAnnesTheme from 'typography-theme-st-annes';

stAnnesTheme.baseFontSize = '18px';
stAnnesTheme.googleFonts[0].styles.push('400');
stAnnesTheme.overrideThemeStyles = ({ rhythm }) => ({
  'h1,h2,h3,h4,h5,h6': {
    marginTop: rhythm(1),
    marginBottom: rhythm(0.6),
  },
  p: {
    marginBottom: rhythm(0.6),
  },
  li: {
    marginBottom: rhythm(0.2),
  },
});

const typography = new Typography(stAnnesTheme);

export default typography;
