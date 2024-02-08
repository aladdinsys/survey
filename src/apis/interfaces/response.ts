export type Response<T> = {
    "timestamp": string;
    "status": string;
    "message": string;
    "result": T;
}