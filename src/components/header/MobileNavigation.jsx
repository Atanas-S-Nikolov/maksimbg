import styles from "@/styles/components/header/MobileNavigation.module.css";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";

import { useState } from "react";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import { navigationLinks, subMenuLinks } from "@/constants/links";

export default function MobileNavigation({ anchor, open, onClose }) {
  const [collapseOpen, setCollapseOpen] = useState(false);

  function toggleCollapse() {
    setCollapseOpen((prevState) => !prevState);
  }

  function handleClose() {
    if (collapseOpen) {
      toggleCollapse();
    }
    onClose();
  }

  function renderList() {
    return (
      <Box role="presentation">
        <List className={styles.mobile_list} disablePadding>
          <ListItem onClick={toggleCollapse} disableGutters>
            <ListItemButton className={styles.mobile_list_button}>
              <ListItemText primary="Информация за кандидатстване" />
            </ListItemButton>
            {collapseOpen ? (
              <KeyboardArrowUpRoundedIcon />
            ) : (
              <KeyboardArrowDownRoundedIcon />
            )}
          </ListItem>
          <Divider />
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <List className={styles.nested_list} disablePadding>
              {subMenuLinks.map((link, index) => (
                <ListItem className={styles.nested_list_link} key={index} disableGutters>
                  <ListItemButton href={link.href}>
                    <ListItemText primary={link.mobileText} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
          {navigationLinks.map((link, index) => (
            <>
              {index > 0 ? <Divider /> : null}
              <ListItem key={index} disableGutters>
                <ListItemButton className={styles.mobile_list_button} href={link.href}>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </Box>
    );
  }

  return (
    <Drawer anchor={anchor} open={open} onClose={handleClose}>
      {renderList()}
    </Drawer>
  );
}
