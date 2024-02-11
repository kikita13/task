export interface Thread {
  number: string;
  title: string;
  short_title: string;
  express_type: string | null;
  transport_type: string;
  carrier: {
    code: number;
    title: string;
    codes: {
      sirena: string | null;
      iata: string | null;
      icao: string | null;
    };
    address: string;
    url: string;
    email: string;
    contacts: string;
    phone: string;
    logo: string;
    logo_svg: string | null;
  };
  uid: string;
  vehicle: any;
  transport_subtype: {
    title: string | null;
    code: string | null;
    color: string | null;
  };
}