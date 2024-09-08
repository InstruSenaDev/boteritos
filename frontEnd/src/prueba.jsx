import React from "react";
import { DatePicker, DateRangePicker } from "@tremor/react";
import { LayoutGeneral } from "./layouts/LayoutGeneral";
import bobito from "../public/img/perfil.png"

const DateRangePickerHero = () => {
  return (
    <LayoutGeneral>
      <div className="mx-auto max-w-md space-y-3">
        <p className="font-cocogooseSemiLight text-paragraph2">
          HOLAAA holaaa Holaa
        </p>
        <p className="text-center font-mono text-sm text-slate-500">
          Date Picker
        </p>
        <DatePicker />
        <p className="pt-6 text-center font-mono text-sm text-slate-500">
          Date Range Picker
        </p>
        <DateRangePicker className="mx-auto max-w-md" />
        <img src={bobito} alt="" />
      </div>
    </LayoutGeneral>
  );
}

export default DateRangePickerHero;