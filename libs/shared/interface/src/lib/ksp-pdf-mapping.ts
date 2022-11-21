import { PDFPageDrawTextOptions, rgb } from 'pdf-lib';
const black = rgb(0, 0, 0);
const defaultSize = 13;
export const kspPdfMapping: IKspPdfMapping[] = [
  {
    pdfType: 99,
    pdfSubType: 3,
    pdfSrc: 'assets/pdf/school-temp-approve-license.pdf',
    input: [
      {
        text: [
          {
            key: 'requestno',
            options: {
              x: 100,
              y: 750,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 320,
              y: 643,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'nameen',
            options: {
              x: 320,
              y: 623,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'careertype',
            options: {
              x: 120,
              y: 604,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'careertypeen',
            options: {
              x: 120,
              y: 585,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'careertype',
            options: {
              x: 205,
              y: 456,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'careertypeen',
            options: {
              x: 425,
              y: 420,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'startth',
            options: {
              x: 120,
              y: 570,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'endth',
            options: {
              x: 270,
              y: 570,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'starten',
            options: {
              x: 120,
              y: 550,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'enden',
            options: {
              x: 270,
              y: 550,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolapprovename',
            options: {
              x: 75,
              y: 493,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolapprovenameen',
            options: {
              x: 105,
              y: 475,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'fulldateth',
            options: {
              x: 290,
              y: 175,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'fulldateen',
            options: {
              x: 290,
              y: 155,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [],
      },
    ],
  },
  {
    pdfType: 3,
    pdfSubType: 1,
    pdfSrc: 'assets/pdf/school-thai-temp-license.pdf',

    input: [
      {
        text: [
          {
            key: 'schoolname',
            options: {
              x: 350,
              y: 609,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'day',
            options: {
              x: 345,
              y: 584,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'month',
            options: {
              x: 420,
              y: 584,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'year',
            options: {
              x: 515,
              y: 584,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolname',
            options: {
              x: 176,
              y: 537,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'bureauname',
            options: {
              x: 100,
              y: 517,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'address',
            options: {
              x: 105,
              y: 498,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'moo',
            options: {
              x: 190,
              y: 498,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'street',
            options: {
              x: 300,
              y: 498,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'road',
            options: {
              x: 440,
              y: 498,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'tumbon',
            options: {
              x: 140,
              y: 477,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'amphurname',
            options: {
              x: 300,
              y: 477,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'provincename',
            options: {
              x: 440,
              y: 477,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'zipcode',
            options: {
              x: 120,
              y: 458,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'telphone',
            options: {
              x: 300,
              y: 458,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'fax',
            options: {
              x: 445,
              y: 458,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'phone',
            options: {
              x: 140,
              y: 438,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 250,
              y: 410,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id1',
            options: {
              x: 190,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id2',
            options: {
              x: 218,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id3',
            options: {
              x: 233,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id4',
            options: {
              x: 248,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id5',
            options: {
              x: 263,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id6',
            options: {
              x: 292,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id7',
            options: {
              x: 307,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id8',
            options: {
              x: 322,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id9',
            options: {
              x: 337,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id10',
            options: {
              x: 352,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id11',
            options: {
              x: 380,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id12',
            options: {
              x: 395,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id13',
            options: {
              x: 410,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'degreename1',
            options: {
              x: 200,
              y: 267,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major1',
            options: {
              x: 420,
              y: 267,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution1',
            options: {
              x: 200,
              y: 245,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'checkbox1',
            options: { x: 45, y: 308 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
    ],
  },
  {
    pdfType: 3,
    pdfSubType: 2,
    pdfSrc: 'assets/pdf/school-manager-temp-license.pdf',
    input: [
      {
        text: [
          {
            key: 'schoolname',
            options: {
              x: 342,
              y: 605,
              size: defaultSize - 2,
              color: black,
            },
          },
          {
            key: 'day',
            options: {
              x: 345,
              y: 580,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'month',
            options: {
              x: 420,
              y: 580,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'year',
            options: {
              x: 515,
              y: 580,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolname',
            options: {
              x: 178,
              y: 520,
              size: defaultSize - 2,
              color: black,
            },
          },
          {
            key: 'bureauname',
            options: {
              x: 425,
              y: 520,
              size: defaultSize - 2,
              color: black,
            },
          },
          {
            key: 'address',
            options: {
              x: 105,
              y: 498,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'moo',
            options: {
              x: 190,
              y: 498,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'street',
            options: {
              x: 300,
              y: 498,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'road',
            options: {
              x: 440,
              y: 498,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'tumbon',
            options: {
              x: 140,
              y: 475,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'amphurname',
            options: {
              x: 300,
              y: 475,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'provincename',
            options: {
              x: 440,
              y: 475,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'zipcode',
            options: {
              x: 120,
              y: 452,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'telphone',
            options: {
              x: 300,
              y: 452,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'fax',
            options: {
              x: 445,
              y: 452,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'telphone',
            options: {
              x: 140,
              y: 429,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 250,
              y: 407,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id1',
            options: {
              x: 190,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id2',
            options: {
              x: 218,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id3',
            options: {
              x: 233,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id4',
            options: {
              x: 248,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id5',
            options: {
              x: 263,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id6',
            options: {
              x: 292,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id7',
            options: {
              x: 307,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id8',
            options: {
              x: 322,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id9',
            options: {
              x: 337,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id10',
            options: {
              x: 352,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id11',
            options: {
              x: 380,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id12',
            options: {
              x: 395,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'id13',
            options: {
              x: 425,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'degreename1',
            options: {
              x: 200,
              y: 272,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major1',
            options: {
              x: 420,
              y: 272,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution1',
            options: {
              x: 200,
              y: 250,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'checkbox1',
            options: { x: 46, y: 313 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
    ],
  },
  {
    pdfType: 3,
    pdfSubType: 5,
    pdfSrc: 'assets/pdf/school-foreign-temp-license.pdf',
    input: [
      { text: [], svg: [] },
      { text: [], svg: [] },
      { text: [], svg: [] },
      {
        text: [
          {
            key: 'day',
            options: {
              x: 330,
              y: 613,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'month',
            options: {
              x: 405,
              y: 613,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'year',
            options: {
              x: 500,
              y: 613,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolname',
            options: {
              x: 185,
              y: 563,
              size: defaultSize - 3,
              color: black,
            },
          },
          {
            key: 'bureauname',
            options: {
              x: 410,
              y: 563,
              size: defaultSize - 3,
              color: black,
            },
          },
          {
            key: 'address',
            options: {
              x: 135,
              y: 541,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'moo',
            options: {
              x: 210,
              y: 541,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'street',
            options: {
              x: 300,
              y: 541,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'road',
            options: {
              x: 440,
              y: 541,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'tumbon',
            options: {
              x: 160,
              y: 520,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'amphurname',
            options: {
              x: 400,
              y: 520,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'provincename',
            options: {
              x: 135,
              y: 495,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'zipcode',
            options: {
              x: 290,
              y: 495,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'telphone',
            options: {
              x: 385,
              y: 495,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'fax',
            options: {
              x: 490,
              y: 495,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'nameen',
            options: {
              x: 280,
              y: 450,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [],
      },
    ],
  },
  {
    pdfType: 6,
    pdfSubType: 1,
    pdfSrc: 'assets/pdf/school-qualification-approve-teacher.pdf',
    input: [],
  },
  {
    pdfType: 6,
    pdfSubType: 2,
    pdfSrc: 'assets/pdf/school-qualification-approve-manager.pdf',
    input: [],
  },
  {
    pdfType: 6,
    pdfSubType: 3,
    pdfSrc: 'assets/pdf/school-qualification-approve-manager.pdf',
    input: [],
  },
  {
    pdfType: 6,
    pdfSubType: 4,
    pdfSrc: 'assets/pdf/school-qualification-approve-education-supervisor.pdf',
    input: [],
  },
  {
    pdfType: 99,
    pdfSubType: 6,
    pdfSrc: 'assets/pdf/school-qualification-approve-temp-license.pdf',
    input: [
      {
        text: [
          {
            key: 'requestno',
            options: {
              x: 115,
              y: 721,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveresult',
            options: {
              x: 85,
              y: 397,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'degreelevel',
            options: {
              x: 245,
              y: 397,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'degreename',
            options: {
              x: 425,
              y: 397,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 255,
              y: 380,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'degreefrom',
            options: {
              x: 115,
              y: 380,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'careertype',
            options: {
              x: 345,
              y: 510,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'careertype',
            options: {
              x: 180,
              y: 360,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 120,
              y: 493,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'position',
            options: {
              x: 350,
              y: 493,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolname',
            options: {
              x: 105,
              y: 475,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'bureauname',
            options: {
              x: 300,
              y: 475,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [],
      },
    ],
  },
];

export interface IKspPdfMapping {
  pdfType: number;
  pdfSubType: number;
  pdfSrc: string;
  input: IKspInput[];
}

export interface IKspInput {
  text: IKspTextInput[];
  svg: IKspSvgInput[];
}

export interface IKspTextInput {
  key: string;
  options: PDFPageDrawTextOptions;
}

export interface IKspSvgInput {
  key: string;
  svgPath: string;
  options: PDFPageDrawTextOptions;
}
