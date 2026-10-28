# MMM-DaysUntil

This module for the [MagicMirror](https://github.com/MichMich/MagicMirror) shows a large countdown: the number of days left until a specific date.

## Installation

1. Navigate to your modules folder and clone the repository:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/kskovar/MMM-DaysUntil.git
```

2. Add the following to the `modules` section of your `config/config.js` file:

```javascript
{
    module: 'MMM-DaysUntil',
    position: 'top_center', // Any region works; center regions look best
    config: {
        eventdate: "2027-01-01",      // YYYY-MM-DD
        toWhat: "New Year's Day",
        // See "Configuration options" below for everything else.
    }
},
```

3. Restart MagicMirror.

## Configuration options

| option | description |
| ------------- | ------------- |
| `eventdate` | The target date as `YYYY-MM-DD`, for example `"2027-07-04"`. A time after the date is allowed but ignored. Default `"2027-01-01"`. |
| `toWhat` | The title shown above the number. Default `"New Year's Day"`. |
| `singular` | Unit when exactly one day is left. Default `"day left"`. |
| `plural` | Unit when two or more days are left. Default `"days left"`. |
| `present` | Shown on the day itself. Default `"Today!"`. |
| `timesUp` | Shown after the date has passed. Default `"Here's to another great year!"`. |
| `showDate` | Show the target date under the number. Default `true`. |
| `numberSize` | Size of the big number in pixels. Default `96`. |
| `accentColor` | Color of the unit label. Default `"#72b8ff"`. |
| `textColor` | Color of the number and the title. Default `"#ffffff"`. |
| `mutedColor` | Color of the title's label and the date. Default `"#9aa4b2"`. |
| `updateInterval` | Time between refreshes in milliseconds. Default `60 * 60 * 1000` (1 hour). The minimum is 10 minutes. The count also refreshes at local midnight. |

## Customization

- Change colors and size in `config.js` with `accentColor`, `textColor`, `mutedColor`, and `numberSize`.
- For more control, copy the rules from `MMM-DaysUntil.css` into your own `custom.css` and change them there.
- Use `singular` and `plural` to change the language of the unit.

## Troubleshooting

- If the module shows "Check eventdate in config.js", the date isn't in `YYYY-MM-DD` format. Check for typos such as a missing zero (`2027-1-1`).
- If the count is off by a day, check that `eventdate` is the date you intend. The count is based on your computer's local date.
