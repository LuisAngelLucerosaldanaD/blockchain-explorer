export class Time {
  static SECOND: number = 1000;
  static MINUTE: number = this.SECOND * 60;
  static HOUR: number = this.MINUTE * 60;
  static DAY: number = this.HOUR * 24;

  static Now = (): Date => new Date();
  static setDate = (date: Date): Date => new Date(date);

}
