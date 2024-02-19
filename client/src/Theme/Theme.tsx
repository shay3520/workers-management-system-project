import { createTheme } from '@mui/material/styles';

const palette = {
  primary: {
    main: '#1976d2',
  },
  background: {
    default: 'rgba(255, 255, 255, 0.8)', 
    paper: 'rgba(255, 255, 255, 0.7)', 
  },
  text: {
    primary: '#1976d2',
    secondary: '#000',
  },
  
};


const theme = createTheme({
  palette,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.7)', 
          backdropFilter: 'blur(5px)', 
        },
      },
    },
  },
  
});

export default theme;
