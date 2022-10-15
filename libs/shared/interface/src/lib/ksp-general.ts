export interface Prefix {
  gender: string;
  id: string;
  name_en: string;
  name_th: string;
}

export interface Province {
  aliasid: string;
  group_no: string;
  order_print: string;
  province_id: string;
  province_name: string;
  province_name_en: string;
}

export interface Amphur {
  amphurCode: string;
  amphurName: string;
}

export interface Tambol {
  tambolCode: string;
  tambolName: string;
  tambolPostcode: string;
}

export interface Country {
  countryEn: string;
  countryId: string;
  countryN: string;
  countryNo: string;
}
