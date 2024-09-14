"use client";

import { useEffect } from "react";

const Title = ({ title }) => {
  useEffect(() => {
    if (title) {
      document.title = "Luxera - " + title;
    }
  }, [title]);

  return null;
};

export default Title;