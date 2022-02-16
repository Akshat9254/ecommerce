import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

export const Item = styled('div')(({ theme }) => ({
    ...theme.typography.body2,
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    color: theme.palette.text.secondary,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
}))

export const useStyles = makeStyles({
    bannerImg: {
        height: 369,
        width: 395
    }
})