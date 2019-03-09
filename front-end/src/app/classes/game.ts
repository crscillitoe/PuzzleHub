import { Difficulty } from '../interfaces/difficulty';

export class Game {
  private readonly _image_path = 'assets/images/game-splashes/';
  private _id: number;
  private _name: string;
  private _image: string;
  private _desc: string;
  private _diffs: Difficulty[];

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get image(): string {
    return this._image;
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
      requires_login: false,
      min_level: 0
    },
    {
      diff: 2,
      name: 'medium',
      color: 'cyan',
      requires_login: false,
      min_level: 0

    },
    {
      diff: 3,
      name: 'hard',
      color: 'blue',
      requires_login: true,
      min_level: 5

    },
    {
      diff: 4,
      name: 'extreme',
      color: 'red',
      requires_login: true,
      min_level: 10
    }
  ];

  constructor(id: number, name: string, image: string, desc: string, diffs?: Difficulty[]) {
    this._id = id;
    this._name = name;
    this._image = this._image_path.concat(image);
    this._desc = desc;
    this._diffs = diffs || Game._default_diffs;
  }
}
