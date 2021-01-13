import * as React from "react";

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  if (navigationRef.current && isReadyRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    console.log("navigation isn't ready yet");
  }
}
