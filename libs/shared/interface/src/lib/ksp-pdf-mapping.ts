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
              x: 150,
              y: 245,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduate1',
            options: {
              x: 420,
              y: 245,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'grade1',
            options: {
              x: 175,
              y: 223,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreename2',
            options: {
              x: 200,
              y: 177,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major2',
            options: {
              x: 420,
              y: 177,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution2',
            options: {
              x: 150,
              y: 155,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduate2',
            options: {
              x: 420,
              y: 155,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'grade2',
            options: {
              x: 175,
              y: 133,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreename3',
            options: {
              x: 200,
              y: 87,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major3',
            options: {
              x: 420,
              y: 87,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution3',
            options: {
              x: 150,
              y: 65,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduate3',
            options: {
              x: 420,
              y: 65,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'grade3',
            options: {
              x: 175,
              y: 43,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          //approve times
          {
            key: 'approve1',
            options: { x: 131, y: 366 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'approve2',
            options: { x: 173, y: 366 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'approve3',
            options: { x: 211, y: 366 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          //degree level
          {
            key: 'degree1',
            options: { x: 46, y: 308 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree2',
            options: { x: 46, y: 217 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree3',
            options: { x: 46, y: 126 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
      {
        text: [
          {
            key: 'subjectName',
            options: {
              x: 275,
              y: 770,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'reasonDetail',
            options: {
              x: 50,
              y: 560,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'otherLevel',
            options: {
              x: 345,
              y: 635,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'otherEvidence',
            options: {
              x: 225,
              y: 50,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          //teaeching level
          {
            key: 'lv1',
            options: { x: 62, y: 719 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'lv3',
            options: { x: 62, y: 696 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'lv5',
            options: { x: 62, y: 672 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'lv7',
            options: { x: 62, y: 649 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'lv2',
            options: { x: 262, y: 719 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'lv4',
            options: { x: 262, y: 696 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'lv6',
            options: { x: 262, y: 672 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'lv8',
            options: { x: 262, y: 649 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          //evidence file
          {
            key: 'evidence1',
            options: { x: 85, y: 442 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence2',
            options: { x: 85, y: 420 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence3',
            options: { x: 84, y: 398 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence4',
            options: { x: 84, y: 376 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence5',
            options: { x: 84, y: 354 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence6',
            options: { x: 84, y: 332 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence7_1',
            options: { x: 118, y: 292 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence7_2',
            options: { x: 118, y: 247 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence8',
            options: { x: 84, y: 202 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence9',
            options: { x: 84, y: 180 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence10',
            options: { x: 84, y: 129 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence11',
            options: { x: 84, y: 107 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence12',
            options: { x: 84, y: 86 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence13',
            options: { x: 84, y: 65 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
      {
        text: [
          {
            key: 'name',
            options: {
              x: 200,
              y: 769,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'prisonDetail',
            options: {
              x: 325,
              y: 675,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'forbid1',
            options: { x: 392, y: 739 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid2',
            options: { x: 442, y: 739 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'forbid3',
            options: { x: 335, y: 714 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid4',
            options: { x: 386, y: 714 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'forbid5',
            options: { x: 204, y: 691 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid6',
            options: { x: 255, y: 691 },
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
            key: 'deegree1',
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
              x: 310,
              y: 510,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'careertype',
            options: {
              x: 155,
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
