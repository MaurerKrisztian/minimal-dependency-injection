import { Container } from "../Container";

export interface IInterceptor {
    intercept(container: Container): void;
}
