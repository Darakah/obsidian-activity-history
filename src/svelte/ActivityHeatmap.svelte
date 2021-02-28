<script>
  import SvelteHeatmap from "svelte-heatmap";

  export let year;
  export let data;
  export let colors = ["#a1dab4", "#42b6c4", "#2c7fb9", "#263494"];
  export let textColor;
  export let emptyColor = "#ecedf0";
  export let cellRadius = 1;
  let startDate = `${year}/01/01`;
  let endDate = `${year}/12/31`;
  let monthlabel = [
    "",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
</script>

<SvelteHeatmap
  {data}
  view="yearly"
  {startDate}
  {endDate}
  monthLabels={monthlabel}
  allowOverflow="true"
  {colors}
  fontColor={textColor}
  {emptyColor}
  {cellRadius}
/>
