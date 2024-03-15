'use client'

import React from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import FittingRoom from '@/components/svg/FittingRoom';

export default function FittingSwitch() {
  return (
    <Switch
      className="fitting-switch"
      defaultSelected
      size="lg"
      color="success"
      startContent={<SunIcon className='rotate-90' />}
      endContent={<FittingRoom className='rotate-[270]' />}
    >
      {/* Dark mode */}
    </Switch>
  );
}
