import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        padding: '.5em 2em',
        '&:focus': {
          outline: 'none',
          boxShadow: 'none'
        },
        '&:hover': {
          color: '#ffffff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        },
        '&:active': {
          color: '#ffffff',
          boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
        },
        ...props.sx
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;