<template>
  <hot-table :settings="hotSettings"></hot-table>
</template>

<script setup>
import { defineComponent } from "vue";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, zhCN } from "handsontable/i18n";
import { ContextMenu } from 'handsontable/plugins/contextMenu';
import "handsontable/dist/handsontable.full.css";
import Handsontable from 'handsontable'
// register Handsontable's modules
registerAllModules();
registerLanguageDictionary(zhCN);
const hotSettings = {
  data: Handsontable.helper.createEmptySpreadsheetData(100, 50),
  width: '100%',
  height: '100%',
  rowHeights: 23,
  language: zhCN.languageCode,
  stretchH: 'all',
  margeCells: true,
  dropdownMenu: true,
  hiddenColumns: {
    indicators: true,
  },
  contextMenu: true,
  multiColumnSorting: true,
  filters: true,
  rowHeaders: true,
  colWidths: 140,
  colHeaders: [
    "Company name",
    "Country",
    "Name",
    "Sell date",
    "Order ID",
    "In stock",
    "Qty",
    "Progress",
    "Rating"
  ],
  columns: [
    { data: 1, type: "text" },
    { data: 2, type: "text" },
    { data: 3, type: "text" },
    {
      data: 4,
      type: "date",
      allowInvalid: false
    },
    { data: 5, type: "text" },
    {
      data: 6,
      type: "checkbox",
      className: "htCenter"
    },
    {
      data: 7,
      type: "numeric"
    },
    {
      data: 8,
      readOnly: true,
      className: "htMiddle"
    },
    {
      data: 9,
      readOnly: true,
      className: "star htCenter",
    }
  ],
  licenseKey: "non-commercial-and-evaluation",
  afterChange: function (change, source) {
    console.log(change,source);
  }
};
</script>
