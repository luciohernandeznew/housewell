
export const FIFTEEN_MIN_INTERVAL_OPTIONS = [
    "7:00am", "7:15am", "7:30am", "7:45am",
    "8:00am", "8:15am", "8:30am", "8:45am",
    "9:00am", "9:15am", "9:30am", "9:45am",
    "10:00am", "10:15am", "10:30am", "10:45am",
    "11:00am", "11:15am", "11:30am", "11:45am",
    "12:00pm", "12:15pm", "12:30pm", "12:45pm",
    "1:00pm", "1:15pm", "1:30pm", "1:45pm",
    "2:00pm", "2:15pm", "2:30pm", "2:45pm",
    "3:00pm", "3:15pm", "3:30pm", "3:45pm",
    "4:00pm", "4:15pm", "4:30pm", "4:45pm",
    "5:00pm", "5:15pm", "5:30pm", "5:45pm",
    "6:00pm", "6:15pm", "6:30pm", "6:45pm",
    "7:00pm", "7:15pm", "7:30pm", "7:45pm",
    "8:00pm", "8:15pm", "8:30pm", "8:45pm",
    "9:00pm"
  ] as const;
export const FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE = {
    "7:00am": 0, "7:15am": 1, "7:30am": 2, "7:45am": 3,
    "8:00am": 4, "8:15am": 5, "8:30am": 6, "8:45am": 7,
    "9:00am": 8, "9:15am": 9, "9:30am": 10, "9:45am": 11,
    "10:00am": 12, "10:15am": 13, "10:30am": 14, "10:45am": 15,
    "11:00am": 16, "11:15am": 17, "11:30am": 18, "11:45am": 19,
    "12:00pm": 20, "12:15pm": 21, "12:30pm": 22, "12:45pm": 23,
    "1:00pm": 24, "1:15pm": 25, "1:30pm": 26, "1:45pm": 27,
    "2:00pm": 28, "2:15pm": 29, "2:30pm": 30, "2:45pm": 31,
    "3:00pm": 32, "3:15pm": 33, "3:30pm": 34, "3:45pm": 35,
    "4:00pm": 36, "4:15pm": 37, "4:30pm": 38, "4:45pm": 39,
    "5:00pm": 40, "5:15pm": 41, "5:30pm": 42, "5:45pm": 43,
    "6:00pm": 44, "6:15pm": 45, "6:30pm": 46, "6:45pm": 47,
    "7:00pm": 48, "7:15pm": 49, "7:30pm": 50, "7:45pm": 51,
    "8:00pm": 52, "8:15pm": 53, "8:30pm": 54, "8:45pm": 55,
    "9:00pm": 56
};
export type FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE = typeof FIFTEEN_MIN_INTERVAL_OPTIONS[number];