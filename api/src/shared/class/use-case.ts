export abstract class UseCase<Data = void, Return = void> {
  abstract execute(data?: Data): Return | Promise<Return>;
}
