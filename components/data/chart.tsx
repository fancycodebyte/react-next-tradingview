import { Divider, Grid, Stack } from "@mui/joy";
import { Box } from "@mui/system";
import { memo, useState } from "react";
import { useThrottledCallback } from "use-debounce";
import { useRows } from "../../hooks/data.hook";
import { ChartData } from "./chart-data";
import { Indicators } from "./indicators";
import { MainChart } from "./main-chart";

export const DataChart1 = () => {
  const { rows } = useRows("source");
  const [active, s] = useState(rows.length - 1);
  const setActive = useThrottledCallback((i: number) => {
    s(i);
  }, 50);

  return (
    <Box>
      <Grid container spacing={4} columns={24}>
        <Grid xs={24} md={19}>
          {rows.length && (
            <MainChart rows={JSON.stringify(rows)} setHover={setActive} />
          )}
        </Grid>
        <Grid xs={24} md={5}>
          <Stack flexShrink={0} spacing={2}>
            <ChartData active={active} datasource="source" />
            <Indicators />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export const DataChart = memo(DataChart1);
