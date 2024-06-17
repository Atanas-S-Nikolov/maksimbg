import styles from "@/styles/components/header/MobileNavigation.module.css";

import { Fragment, useEffect } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { navigationLinks, subMenuLinks } from "@/constants/links";
import { logout } from "@/services/AdminService";
import { logoutReducer } from "@/lib/store/slices/authenticationSlice";
import UnauthorizedHandler from "@/utils/UnauthorizedHandler";

export default function MobileNavigation({ anchor, open, onClose }) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  function toggleCollapse() {
    setCollapseOpen((prevState) => !prevState);
  }

  function handleClose() {
    if (collapseOpen) {
      toggleCollapse();
    }
    onClose();
  }

  async function handleLogout() {
    await new UnauthorizedHandler(async () => {
      await logout();
      dispatch(logoutReducer());
    }).execute();
  }

  useEffect(() => {
    function handlePopState(event) {
      event.preventDefault();
      handleClose();
    }
    addEventListener("popstate", handlePopState);

    return function () {
      removeEventListener("popstate", handlePopState);
    };
  });

  function renderList() {
    return (
      <Box role="presentation">
        <IconButton onClick={handleClose}>
          <CloseRoundedIcon />
        </IconButton>
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
              {subMenuLinks.map((link) => (
                <ListItem
                  key={link.mobileText}
                  className={styles.nested_list_link}
                  disableGutters
                >
                  <ListItemButton href={link.href}>
                    <ListItemText primary={link.mobileText} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
          {navigationLinks.map((link, index) => (
            <Fragment key={index}>
              {index > 0 ? <Divider /> : null}
              <ListItem disableGutters>
                <ListItemButton
                  className={styles.mobile_list_button}
                  href={link.href}
                >
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            </Fragment>
          ))}
          {isLoggedIn ? (
            <ListItem className={styles.logout_list_button} disableGutters>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Изход" />
              </ListItemButton>
            </ListItem>
          ) : null}
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
