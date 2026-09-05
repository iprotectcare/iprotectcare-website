/** The eight common repairs shown in the homepage carousel (spec §4). */
export const commonRepairs = [
  {
    name: "Screen replacement",
    blurb: "Cracked or unresponsive display swapped with a genuine panel.",
    icon: "screen",
  },
  {
    name: "Battery replacement",
    blurb: "Draining fast or shutting down early? A new battery restores full-day life.",
    icon: "battery",
  },
  {
    name: "Water damage",
    blurb: "Ultrasonic cleaning and board-level treatment to rescue liquid-damaged devices.",
    icon: "droplet",
  },
  {
    name: "Charging port",
    blurb: "Loose cables and slow charging fixed with a port replacement.",
    icon: "plug",
  },
  {
    name: "Logic board repair",
    blurb: "Component-level microsoldering for devices that won't power on.",
    icon: "chip",
  },
  {
    name: "Keyboard & trackpad",
    blurb: "Sticky keys, dead keys and unresponsive trackpads on MacBooks.",
    icon: "keyboard",
  },
  {
    name: "Camera repair",
    blurb: "Blurry photos, shaking lenses and black screens on front or rear cameras.",
    icon: "camera",
  },
  {
    name: "Data recovery",
    blurb: "Photos and files recovered from devices that no longer boot.",
    icon: "database",
  },
] as const;
