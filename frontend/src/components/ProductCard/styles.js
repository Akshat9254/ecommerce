import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
    card: {
        transition: '200ms ease-in-out',
        '&:hover': {
            transform: 'scale(1.04) perspective(0px)',
            boxShadow: theme.shadows[5]
        }
    }
}))