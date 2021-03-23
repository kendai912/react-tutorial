// Booklist.jsx
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 1050,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const Booklist = (props) => {
  const [bookData, setBookData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const result = props.getData?.(props.language).then((response) => {
      setBookData(response);
      console.log(response);
    });
  }, [props]);

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">{props.language}</ListSubheader>
        </GridListTile>
        {bookData?.data.items.map((item, index) => (
          <GridListTile key={index}>
            <img
              src={item.volumeInfo.imageLinks?.thumbnail}
              alt={item.volumeInfo.title}
            />
            <GridListTileBar
              title={item.volumeInfo.title}
              subtitle={<span>by: {item.volumeInfo.authors}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
export default Booklist;
