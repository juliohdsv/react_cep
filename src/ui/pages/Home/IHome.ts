export interface IInput {
  zipcode: string;
}

export interface IOutput{
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  location: {
    coordinates: {
      longitude: string;
      latitude: string;
    }
  }
}


