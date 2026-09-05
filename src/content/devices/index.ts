import type { Device } from "./types";
import { iphone } from "./iphone";
import { ipad } from "./ipad";
import { macbook } from "./macbook";
import { watch } from "./watch";

export type { Device, Repair, DeviceFaq } from "./types";

/** Nav and grid order. A sixth device is a data entry here, not a new page. */
export const devices: Device[] = [iphone, ipad, macbook, watch];

export function getDevice(slug: string): Device | undefined {
  return devices.find((d) => d.slug === slug);
}
