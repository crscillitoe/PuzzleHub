import { Difficulty } from '../interfaces/difficulty';

export class Game {
  private static readonly _default_diffs: Difficulty[] = [
    {
      diff: 1,
      name: 'easy',
      color: 'green',
      requiresLogin: false,
      minLevel: 0,
      cssBgColor: 'easy-bg',
      cssTextColor: 'easy-color',
    },
    {
      diff: 2,
      name: 'medium',
      color: 'cyan',
      requiresLogin: false,
      minLevel: 0,
      cssBgColor: 'medium-bg',
      cssTextColor: 'medium-color',
    },
    {
      diff: 3,
      name: 'hard',
      color: 'blue',
      requiresLogin: true,
      minLevel: 5,
      cssBgColor: 'hard-bg',
      cssTextColor: 'hard-color',
    },
    {
      diff: 4,
      name: 'extreme',
      color: 'red',
      requiresLogin: true,
      minLevel: 10,
      cssBgColor: 'extreme-bg',
      cssTextColor: 'extreme-color',
    }
  ];

  private _id: number;
  private _name: string;
  private _cleanName: string;
  private _imagePath = 'assets/images/game-splashes/';
  private _imageBase: string;
  private _desc: string;
  private _longDesc: string[];
  private _rules: string;
  private _controls: string;
  private _diffs: Difficulty[];
  private _keywords: string;

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get cleanName(): string {
    return this._cleanName;
  }

  get image(): string {
    return this._imagePath.concat(this._imageBase);
  }

  set imagePath(imagePath: string) {
    this._imagePath = imagePath;
  }

  get desc(): string {
    return this._desc;
  }

  get longDesc(): string[] {
    return this._longDesc;
  }

  get rules(): string {
    return this._rules;
  }

  get controls(): string {
    return this._controls;
  }

  get keywords(): string {
    return this._keywords;
  }

  get diffs(): Difficulty[] {
    return this._diffs;
  }

  constructor(
    id: number,
    name: string,
    cleanName: string,
    image: string,
    desc: string,
    longDesc: string[],
    rules: string,
    controls: string,
    keywords: string,
    diffs?: Difficulty[],
    ) {
    this._id = id;
    this._name = name;
    this._cleanName = cleanName;
    this._imageBase = image;
    this._desc = desc;
    this._longDesc = longDesc;
    this._rules = rules;
    this._controls = controls;
    this._keywords = keywords;
    this._diffs = diffs || Game._default_diffs;
  }

  public getDifficultyById(id: number): Difficulty {
    for (const d of this.diffs) {
      if (d.diff === id) {
        return d;
      }
    }
  }

  public getDifficultyNameById(id: number): string {
    for (const d of this.diffs) {
      if (d.diff === id) {
        return d.name;
      }
    }
  }
}
