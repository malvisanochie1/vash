type Shades<K extends string | number> = Record<K, string>;

export declare const palette: {
  white: string;
  blush: Shades<50 | 100 | 200 | 300 | 400>;
  rose: Shades<300 | 400 | 500 | 600 | 700>;
  plum: Shades<600 | 700 | 800 | 900>;
  ink: string;
  muted: string;
  line: string;
  success: string;
  gold: string;
};

export declare const fontFamily: Record<string, string[]>;
