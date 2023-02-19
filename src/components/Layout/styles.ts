import { css } from '@emotion/react';

export const cssLayout = css({
  minHeight: '100vh',

  ".trigger": {
    padding: "0 24px",
    fontSize: "18px",
    lineHeight: "64px",
    cursor: "pointer",
    transition: "color 0.3s"
  },

  ".trigger:hover": { color: "#1890ff" },

  ".logo": {
    height: "32px",
    margin: "16px",
    background: "rgba(255, 255, 255, 0.3)"
  },

  ".site-layout .site-layout-background": { background: "#fff" }
});