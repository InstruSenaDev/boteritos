import { DatePicker, DateRangePicker } from '@tremor/react';
import React from 'react';
import './index.css'

export function DateRangePickerHero() {
  return (
    <div className="mx-auto max-w-md space-y-3">
      <p className='font-cocogooseSemiLight text-paragraph2'>HOLAAA holaaa Holaa</p>
      <p className="text-center font-mono text-sm text-slate-500">
        Date Picker
      </p>
      <DatePicker />
      <p className="pt-6 text-center font-mono text-sm text-slate-500">
        Date Range Picker
      </p>
      <DateRangePicker className="mx-auto max-w-md" />
    </div>
  );
}