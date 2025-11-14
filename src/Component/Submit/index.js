import { Button, ButtonGroup, Typography } from "@mui/material";
import useStyles from "./Styles";

export default function UnstyledTabsCustomized(props) {
  const classes = useStyles();

  return (
    <div maxWidth="xl">
      <Typography align="center" className={classes.mainTxt}>
        BERDASARKAN PEMERIKSAAN DIATAS, YANG BERSANGKUTAN DINYATAKAN
      </Typography>
      <ButtonGroup style={{ width: "100%", marginTop: 20 }}>
        <Button
          onClick={() => props.handleClick("1")}
          style={{ width: "100%" }}
          variant="contained"
          color={props.chooseBtn === "1" ? "success" : "inherit"}
        >
          FIT TO WORK
        </Button>
        <Button
          onClick={() => props.handleClick("2")}
          style={{ width: "100%" }}
          variant="contained"
          color={props.chooseBtn === "2" ? "warning" : "inherit"}
        >
          FIT TO WORK WITH NOTE
        </Button>
        <Button
          onClick={() => props.handleClick("3")}
          style={{ width: "100%" }}
          variant="contained"
          color={props.chooseBtn === "3" ? "error" : "inherit"}
        >
          UNFIT TO WORK
        </Button>
      </ButtonGroup>
      {/* <TabContext defaultValue={0}>
        <TabList>
          <Tab onClick={()=>props.handleClick("1")}>
            <Typography className={classes.tabTxt}>FIT TO WORK</Typography>
          </Tab>
          <Tab onClick={()=>props.handleClick("2")}>
            <Typography className={classes.tabTxt}>
              FIT TO WORK WITH NOTE
            </Typography>
          </Tab>
          <Tab onClick={()=>props.handleClick("3")}>
            <Typography className={classes.tabTxt}>UNFIT TO WORK</Typography>
          </Tab>
          
          {
            props.statusForm !== "5" ?
            <Tab onClick={()=>props.handleClick("4")}>
            <Typography className={classes.tabTxt}>RETAKE</Typography>
          </Tab>: null
          }
          
        </TabList>
      </TabContext> */}
    </div>
  );
}
