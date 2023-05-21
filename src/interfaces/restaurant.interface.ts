export interface IRestaurantAttributes {
  isitma: string;
  konum: string;
  alkol: string;
}

export interface IRestaurantData {
  restaurantName: string;
  restaurantImage: string;
  city: string;
  district: string;
  detailedAddress: string;
  latitude: string;
  longitude: string;
  starCount: string;
  restaurantAttributes: IRestaurantAttributes;
  bookingAvailable: boolean;
  openingTime: string;
  closingTime: string;
  intervalMinutes: string;
  busyDates: string[];
}

export interface IRestaurantTable {
  id: number;
  restaurantImage: string;
  phone: string;
  restaurantName: string;
  city: string;
  bookingAvailable: string;
  openingTime: string;
  closingTime: string;
}
