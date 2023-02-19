import { css } from '@emotion/react';

export const cssProductsPage = css({
  '.search-wrapper': {
    position: 'relative',
    height: 70,
  },

  '.ant-input-group-wrapper': {
    maxWidth: 400,
    position: 'absolute',
    right: 0,
  },

  '.ant-input-affix-wrapper': {
    borderRadius: '12px 0 0 12px !important',
  },
  
  '.ant-input-search-button': {
    borderRadius: '0 12px 12px 0 !important',
  }
});
