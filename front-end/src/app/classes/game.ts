import { Difficulty } from '../interfaces/difficulty';

export class Game {
  private _id: number;
  private _name: string;
  private _imagePath = 'assets/images/game-splashes/';
  private _imageBase: string;
  private _desc: string;
  private _diffs: Difficulty[];

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
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

  get diffs(): Difficulty[] {
    return this._diffs;
  }

  private static readonly _default_diffs: Difficulty[] = [
    {
      diff: 1,
      name: 'easy',
      color: 'green',
      requiresLogin: false,
      minLevel: 0
    },
    {
      diff: 2,
      name: 'medium',
      color: 'cyan',
      requiresLogin: false,
      minLevel: 0

    },
    {
      diff: 3,
      name: 'hard',
      color: 'blue',
      requiresLogin: true,
      minLevel: 5

    },
    {
      diff: 4,
      name: 'extreme',
      color: 'red',
      requiresLogin: true,
      minLevel: 10
    }
  ];

  constructor(id: number, name: string, image: string, desc: string, diffs?: Difficulty[]) {
    this._id = id;
    this._name = name;
    this._imageBase = image;
    this._desc = desc;
    this._diffs = diffs || Game._default_diffs;
  }
}