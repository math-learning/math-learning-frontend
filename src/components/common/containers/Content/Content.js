import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function Content(props) {
  const { hasLeftPanel, children } = props;
  let gridColumns = { xs: 12, sm: 9, md: 10 };
  if (!hasLeftPanel) {
    gridColumns = { xs: 12, sm: 12, md: 12 };
  }
  return (
    <Grid item xs={gridColumns.xs} sm={gridColumns.sm} md={gridColumns.md}>
      {children}
    </Grid>
  );
}
