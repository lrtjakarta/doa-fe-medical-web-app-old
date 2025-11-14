import { Grid, Typography } from '@mui/material'
import UseCounting from 'Hooks/Counting/useCounting'
import moment from 'moment'
import React, { memo } from 'react'
import UseCheckup from "Hooks/Checkup/useCheckup";
    
function Duration(props) {
    const { title,checkup } = props
    const { calculateTimeLeft } = UseCounting()

    return (
    <Grid container>
         <Typography
              align="right"
              sx={{ color: "#F2B464",alignItems:'center',mt:1,mr:1,fontSize: {
                lg: 18,
                md: 16,
                sm: 12,
                xs: 11,
                fontWeight:800
              }}}
            > {props.title}</Typography>
        <Typography
              align="right"
              sx={{ color: "#F2B464",alignItems:'center',mt:1,mr:1,fontSize: {
                lg: 18,
                md: 16,
                sm: 12,
                xs: 11,
                fontWeight:800
              }}}
            >
              {     
        (calculateTimeLeft(moment(props?.startTime).format("MM/DD/YYYY HH:mm:ss"))).hours + ":" +
        (calculateTimeLeft(moment(props?.startTime).format("MM/DD/YYYY HH:mm:ss"))).minutes + ":" +
        (calculateTimeLeft(moment(props?.startTime).format("MM/DD/YYYY HH:mm:ss"))).seconds 
        
              }
            </Typography>
    </Grid>
    )
}

export default memo(Duration)