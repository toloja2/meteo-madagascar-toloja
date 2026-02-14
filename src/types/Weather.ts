

export interface WeatherReponse{
    name:string,
    main: {
        temp : number,
        humidity : number
    },
    weather :{
        description:string,
        icon : string,
        main : string,
    }[],
    wind :{
        speed : number
    }
}

