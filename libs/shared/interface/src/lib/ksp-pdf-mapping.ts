import { PDFPageDrawTextOptions, rgb } from 'pdf-lib';
const black = rgb(0, 0, 0);
const defaultSize = 14;
export const kspPdfMapping: IKspPdfMapping[] = [
  {
    pdfType: 1,
    pdfSrc: 'assets/pdf/school-temp-license.pdf',
    input: [
      [
        {
          key: 'day',
          options: {
            x: 345,
            y: 595,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'month',
          options: {
            x: 420,
            y: 595,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'year',
          options: {
            x: 515,
            y: 595,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'schoolname',
          options: {
            x: 195,
            y: 535,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'bureauname',
          options: {
            x: 430,
            y: 535,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'address',
          options: {
            x: 105,
            y: 513,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'moo',
          options: {
            x: 190,
            y: 513,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'street',
          options: {
            x: 300,
            y: 513,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'road',
          options: {
            x: 440,
            y: 513,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'tumbon',
          options: {
            x: 140,
            y: 490,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'amphurname',
          options: {
            x: 300,
            y: 490,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'provincename',
          options: {
            x: 440,
            y: 490,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'zipcode',
          options: {
            x: 120,
            y: 467,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'telphone',
          options: {
            x: 300,
            y: 467,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'fax',
          options: {
            x: 445,
            y: 467,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'telphone',
          options: {
            x: 140,
            y: 444,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'name',
          options: {
            x: 250,
            y: 422,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id1',
          options: {
            x: 190,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id2',
          options: {
            x: 218,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id3',
          options: {
            x: 233,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id4',
          options: {
            x: 248,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id5',
          options: {
            x: 263,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id6',
          options: {
            x: 292,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id7',
          options: {
            x: 307,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id8',
          options: {
            x: 322,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id9',
          options: {
            x: 337,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id10',
          options: {
            x: 352,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id11',
          options: {
            x: 380,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id12',
          options: {
            x: 395,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'id13',
          options: {
            x: 425,
            y: 390,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'degreename1',
          options: {
            x: 200,
            y: 287,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'major1',
          options: {
            x: 420,
            y: 287,
            size: defaultSize,
            color: black,
          },
        },
        {
          key: 'institution1',
          options: {
            x: 200,
            y: 265,
            size: defaultSize,
            color: black,
          },
        },
      ],
    ],
  },
];

export interface IKspPdfMapping {
  pdfType: number;
  pdfSrc: string;
  input: IKspInput[][];
}

export interface IKspInput {
  key: string;
  options: PDFPageDrawTextOptions;
}
