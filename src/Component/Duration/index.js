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
              sx={{ color: "#000",alignItems:'center',mt:1,mr:1,fontSize: {
                lg: 14,
                md: 13,
                sm: 14,
                xs: 13,
                fontWeight:400
              }}}
            > {title ? "Durasi Pemeriksaan": "" }</Typography>
        <Typography
              align="right"
              sx={{ color: "#000",alignItems:'center',mt:1,mr:1,fontSize: {
                lg: 14,
                md: 13,
                sm: 14,
                xs: 13,
                fontWeight:400
              }}}
            >
              {     
        (calculateTimeLeft(moment(checkup?.createdAt).format("MM/DD/YYYY HH:mm:ss"))).hours + ":" +
        (calculateTimeLeft(moment(checkup?.createdAt).format("MM/DD/YYYY HH:mm:ss"))).minutes + ":" +
        (calculateTimeLeft(moment(checkup?.createdAt).format("MM/DD/YYYY HH:mm:ss"))).seconds 
        
              }
            </Typography>
    </Grid>
    )
}

export default memo(Duration)