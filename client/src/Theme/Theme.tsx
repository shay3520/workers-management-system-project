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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#333',
          color: 'white',
          width: 240, 
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'white', 
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: 'white', 
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'grey', 
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 'bold',
          fontSize: '1.2rem', 
          color: 'black', 
        },
      },
    },
  },
});

export default theme;
