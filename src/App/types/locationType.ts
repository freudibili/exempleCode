export type AddressType = {
  formattedAddress: string;
  coordinates: number[];
};

export type PositionType = {
  address?: AddressType;
  distance?: number;
};
