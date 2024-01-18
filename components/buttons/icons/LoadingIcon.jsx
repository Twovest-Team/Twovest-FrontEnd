import CircularProgress from '@mui/material/CircularProgress';

const LoadingIcon = ({size}) => {
  return (
    <span className='translate-y-1'>
      <CircularProgress size={`${size ? size : '18'}px`} color="inherit" thickness={5} />
    </span>
  )
}

export default LoadingIcon