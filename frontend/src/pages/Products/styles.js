import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
    sidebar: {
        [theme.breakpoints.down('lg')]: {
            display: 'none'
        }
    }
}))