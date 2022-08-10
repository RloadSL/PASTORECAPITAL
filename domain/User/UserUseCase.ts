class UserUseCase {
  private static instance: UserUseCase;
  private constructor() {}

  public static getInstance(): UserUseCase {
    if (!UserUseCase.instance) {
      UserUseCase.instance = new UserUseCase();
    }

    return UserUseCase.instance;
  }
}