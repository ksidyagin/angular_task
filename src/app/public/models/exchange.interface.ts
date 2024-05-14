export interface ExchangeI {
    base_code:string;
    target_code: string;
    documentation:string;
    provider:string;
    conversion_rate:number;
    result:string;
    terms_of_use:string;
    time_eol_unix: number;
    time_last_update_unix: number;
    time_last_update_utc: Date;
    time_next_update_unix: number;
    time_next_update_utc: Date;

}