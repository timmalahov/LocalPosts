import * as React from "react";

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (navigationRef.current) {
    setTimeout(() => {
      navigationRef.current.navigate(name, params);
    }, 0);
  } else {
    console.log(`navigation isn't ready yet`);
  }
}
