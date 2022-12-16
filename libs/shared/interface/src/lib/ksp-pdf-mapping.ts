import { PDFPageDrawTextOptions, rgb } from 'pdf-lib';
const black = rgb(0, 0, 0);
const defaultSize = 13;
export const kspPdfMapping: IKspPdfMapping[] = [
  //ใบอนุญาตของ หนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ
  {
    pdfType: 99,
    pdfSubType: 3,
    pdfSrc: 'assets/pdf/school-temp-approve-license.pdf',
    input: [
      {
        text: [
          {
            key: 'prefix',
            options: {
              x: 90,
              y: 750,
              size: defaultSize,
              color: black,
            },
          },
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
  //ใบคำขอของ หนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ ครู
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
            key: 'reasonDetail2',
            options: {
              x: 50,
              y: 538,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'reasonDetail3',
            options: {
              x: 50,
              y: 514,
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
            key: 'forbid1_1',
            options: { x: 392, y: 739 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid1_2',
            options: { x: 442, y: 739 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'forbid2_1',
            options: { x: 335, y: 714 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid2_2',
            options: { x: 386, y: 714 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'forbid3_1',
            options: { x: 204, y: 691 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid3_2',
            options: { x: 255, y: 691 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
    ],
  },
  //ใบคำขอของ หนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ ผู้บริหาร
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
          {
            key: 'graduate1',
            options: {
              x: 415,
              y: 250,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'grade1',
            options: {
              x: 180,
              y: 227,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreename2',
            options: {
              x: 200,
              y: 180,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major2',
            options: {
              x: 420,
              y: 180,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution2',
            options: {
              x: 200,
              y: 157,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduate2',
            options: {
              x: 415,
              y: 157,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'grade2',
            options: {
              x: 180,
              y: 134,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreename3',
            options: {
              x: 200,
              y: 89,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major3',
            options: {
              x: 420,
              y: 89,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution3',
            options: {
              x: 200,
              y: 66,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduate3',
            options: {
              x: 415,
              y: 66,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'grade3',
            options: {
              x: 180,
              y: 43,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'approve1',
            options: { x: 135, y: 364 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'approve2',
            options: { x: 176, y: 364 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'degree1',
            options: { x: 46, y: 313 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree2',
            options: { x: 46, y: 220 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree3',
            options: { x: 46, y: 128 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
      {
        text: [
          {
            key: 'position',
            options: {
              x: 260,
              y: 767,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'reasonDetail',
            options: {
              x: 50,
              y: 709,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'reasonDetail2',
            options: {
              x: 50,
              y: 685,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'reasonDetail3',
            options: {
              x: 50,
              y: 662,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'otherEvidence',
            options: {
              x: 205,
              y: 107,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'evidence1',
            options: { x: 64, y: 563 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence2',
            options: { x: 64, y: 540 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence3',
            options: { x: 64, y: 516 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence4',
            options: { x: 64, y: 493 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence5',
            options: { x: 64, y: 470 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence6',
            options: { x: 64, y: 447 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence7',
            options: { x: 64, y: 424 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence8',
            options: { x: 64, y: 400 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence9',
            options: { x: 64, y: 361 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence10',
            options: { x: 67, y: 320 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence11',
            options: { x: 64, y: 263 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence12',
            options: { x: 64, y: 172 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence13',
            options: { x: 64, y: 148 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence14',
            options: { x: 64, y: 125 },
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
              y: 598,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'prisonDetail',
            options: {
              x: 325,
              y: 512,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'secondDegree',
            options: {
              x: 200,
              y: 680,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'secondMajor',
            options: {
              x: 425,
              y: 680,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'secondInstitution',
            options: {
              x: 125,
              y: 655,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'secondAdmission',
            options: {
              x: 460,
              y: 655,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'degreeApprove',
            options: { x: 45, y: 740 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'forbid1_1',
            options: { x: 390, y: 575 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid1_2',
            options: { x: 440, y: 575 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'forbid2_1',
            options: { x: 335, y: 552 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid2_2',
            options: { x: 386, y: 552 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'forbid3_1',
            options: { x: 206, y: 529 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid3_2',
            options: { x: 257, y: 529 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
    ],
  },
  //ใบคำขอของ หนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ ต่างชาติ
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
            key: 'schoolemail',
            options: {
              x: 175,
              y: 472,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'email',
            options: {
              x: 415,
              y: 472,
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

          {
            key: 'nationality',
            options: {
              x: 125,
              y: 427,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'birthdate',
            options: {
              x: 250,
              y: 427,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'passportno',
            options: {
              x: 450,
              y: 427,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreename1',
            options: {
              x: 200,
              y: 405,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major1',
            options: {
              x: 412,
              y: 405,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'institution1',
            options: {
              x: 175,
              y: 383,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'country1',
            options: {
              x: 427,
              y: 383,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'admission1',
            options: {
              x: 177,
              y: 361,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduate1',
            options: {
              x: 425,
              y: 361,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'subjectName',
            options: {
              x: 400,
              y: 339,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'level',
            options: {
              x: 150,
              y: 317,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'hiringStartDate',
            options: {
              x: 215,
              y: 295,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'hiringEndDate',
            options: {
              x: 390,
              y: 295,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'reasonDetail',
            options: {
              x: 250,
              y: 273,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'reasonDetail2',
            options: {
              x: 75,
              y: 250,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'nameen',
            options: {
              x: 425,
              y: 205,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'evidence1',
            options: { x: 87, y: 157 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence2',
            options: { x: 87, y: 135 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence3',
            options: { x: 87, y: 111 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence4',
            options: { x: 87, y: 88 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
      {
        text: [],
        svg: [
          {
            key: 'evidence5',
            options: { x: 86, y: 708 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence5',
            options: { x: 88, y: 640 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence7',
            options: { x: 89, y: 572 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence8',
            options: { x: 89, y: 550 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
      {
        text: [
          {
            key: 'forbid3',
            options: {
              x: 145,
              y: 432,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'forbid1_1',
            options: { x: 357, y: 557 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid1_2',
            options: { x: 418, y: 557 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid2_1',
            options: { x: 359, y: 513 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'forbid2_2',
            options: { x: 420, y: 513 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
    ],
  },
  //ใบคำขอของ หนังสือรับรองคุณวุฒิ ครู
  {
    pdfType: 6,
    pdfSubType: 1,
    pdfSrc: 'assets/pdf/school-qualification-approve-teacher.pdf',
    input: [
      {
        text: [
          {
            key: 'schoolname',
            options: {
              x: 385,
              y: 632,
              size: defaultSize - 2,
              color: black,
            },
          },
          {
            key: 'day',
            options: {
              x: 370,
              y: 614,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'month',
            options: {
              x: 415,
              y: 614,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'year',
            options: {
              x: 488,
              y: 614,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolname',
            options: {
              x: 208,
              y: 567,
              size: defaultSize - 3,
              color: black,
            },
          },
          {
            key: 'bureauname',
            options: {
              x: 385,
              y: 567,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'address',
            options: {
              x: 130,
              y: 548,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'moo',
            options: {
              x: 190,
              y: 548,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'street',
            options: {
              x: 275,
              y: 548,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'road',
            options: {
              x: 405,
              y: 548,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'tumbon',
            options: {
              x: 140,
              y: 531,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'amphurname',
            options: {
              x: 275,
              y: 531,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'provincename',
            options: {
              x: 415,
              y: 531,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'zipcode',
            options: {
              x: 140,
              y: 513,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'telphone',
            options: {
              x: 375,
              y: 513,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'fax',
            options: {
              x: 140,
              y: 496,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'phone',
            options: {
              x: 420,
              y: 496,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'name',
            options: {
              x: 155,
              y: 462,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'position',
            options: {
              x: 375,
              y: 462,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'bureauname',
            options: {
              x: 125,
              y: 445,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'experinceYear',
            options: {
              x: 450,
              y: 445,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreename1',
            options: {
              x: 205,
              y: 393,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major1',
            options: {
              x: 385,
              y: 393,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution1',
            options: {
              x: 175,
              y: 376,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate1',
            options: {
              x: 450,
              y: 376,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreename2',
            options: {
              x: 205,
              y: 341,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major2',
            options: {
              x: 385,
              y: 341,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution2',
            options: {
              x: 175,
              y: 324,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate2',
            options: {
              x: 450,
              y: 324,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreename3',
            options: {
              x: 205,
              y: 289,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major3',
            options: {
              x: 385,
              y: 289,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution3',
            options: {
              x: 175,
              y: 272,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate3',
            options: {
              x: 450,
              y: 272,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreename4',
            options: {
              x: 205,
              y: 237,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major4',
            options: {
              x: 385,
              y: 237,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution4',
            options: {
              x: 175,
              y: 220,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate4',
            options: {
              x: 450,
              y: 220,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'approveDegreeLevel',
            options: {
              x: 240,
              y: 190,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveDegreeName',
            options: {
              x: 410,
              y: 190,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveMajor',
            options: {
              x: 145,
              y: 173,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveInstitution',
            options: {
              x: 380,
              y: 173,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'reasonDetail',
            options: {
              x: 305,
              y: 138,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'degree1',
            options: { x: 79, y: 424 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree2',
            options: { x: 79, y: 373 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree3',
            options: { x: 79, y: 321 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree4',
            options: { x: 79, y: 269 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
      {
        text: [
          {
            key: 'name',
            options: {
              x: 275,
              y: 693,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 275,
              y: 333,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'evidence1',
            options: { x: 93, y: 691 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence2',
            options: { x: 93, y: 673 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence3',
            options: { x: 93, y: 655 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence4',
            options: { x: 93, y: 637 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence5',
            options: { x: 93, y: 619 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence6',
            options: { x: 93, y: 601 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence7',
            options: { x: 93, y: 567 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence8',
            options: { x: 93, y: 550 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence8_1',
            options: { x: 128, y: 532 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence8_2',
            options: { x: 126, y: 498 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence8_3',
            options: { x: 126, y: 412 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
    ],
  },
  //ใบคำขอของ หนังสือรับรองคุณวุฒิ ผู้บริหารสถานศึกษา
  {
    pdfType: 6,
    pdfSubType: 2,
    pdfSrc: 'assets/pdf/school-qualification-approve-manager.pdf',
    input: [
      {
        text: [
          {
            key: 'schoolname',
            options: {
              x: 387,
              y: 612,
              size: defaultSize - 1,
              color: black,
            },
          },
          {
            key: 'day',
            options: {
              x: 370,
              y: 594,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'month',
            options: {
              x: 415,
              y: 594,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'year',
            options: {
              x: 488,
              y: 594,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolname',
            options: {
              x: 210,
              y: 548,
              size: defaultSize - 3,
              color: black,
            },
          },
          {
            key: 'bureauname',
            options: {
              x: 385,
              y: 548,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'address',
            options: {
              x: 130,
              y: 529,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'moo',
            options: {
              x: 190,
              y: 529,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'street',
            options: {
              x: 275,
              y: 529,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'road',
            options: {
              x: 405,
              y: 529,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'tumbon',
            options: {
              x: 140,
              y: 512,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'amphurname',
            options: {
              x: 275,
              y: 512,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'provincename',
            options: {
              x: 415,
              y: 512,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'zipcode',
            options: {
              x: 140,
              y: 495,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'telphone',
            options: {
              x: 375,
              y: 495,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'fax',
            options: {
              x: 140,
              y: 477,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'phone',
            options: {
              x: 420,
              y: 477,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'name',
            options: {
              x: 200,
              y: 443,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'position',
            options: {
              x: 425,
              y: 443,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'bureauname',
            options: {
              x: 125,
              y: 424,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'experienceYear',
            options: {
              x: 450,
              y: 424,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'otherPosition',
            options: {
              x: 175,
              y: 409,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'otherExperienceYear',
            options: {
              x: 310,
              y: 409,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreeName1',
            options: {
              x: 205,
              y: 357,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major1',
            options: {
              x: 385,
              y: 357,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution1',
            options: {
              x: 175,
              y: 339,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate1',
            options: {
              x: 450,
              y: 339,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreeName2',
            options: {
              x: 205,
              y: 305,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major2',
            options: {
              x: 385,
              y: 305,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution2',
            options: {
              x: 175,
              y: 288,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate2',
            options: {
              x: 450,
              y: 288,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreeName3',
            options: {
              x: 205,
              y: 253,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major3',
            options: {
              x: 385,
              y: 253,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution3',
            options: {
              x: 175,
              y: 236,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate3',
            options: {
              x: 450,
              y: 236,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreeName4',
            options: {
              x: 205,
              y: 201,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major4',
            options: {
              x: 385,
              y: 201,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution4',
            options: {
              x: 175,
              y: 184,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate4',
            options: {
              x: 450,
              y: 184,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'approveDegreeLevel',
            options: {
              x: 240,
              y: 154,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveDegreeName',
            options: {
              x: 410,
              y: 154,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveMajor',
            options: {
              x: 149,
              y: 137,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveGraduateDate',
            options: {
              x: 380,
              y: 137,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'reasonDetail',
            options: {
              x: 320,
              y: 101,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'degree1',
            options: { x: 81, y: 388 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree2',
            options: { x: 81, y: 336 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree3',
            options: { x: 81, y: 284 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree4',
            options: { x: 82, y: 232 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
      {
        text: [
          {
            key: 'name',
            options: {
              x: 275,
              y: 706,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 275,
              y: 293,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'evidence1',
            options: { x: 94, y: 702 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence2',
            options: { x: 93, y: 684 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence3',
            options: { x: 93, y: 666 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence4',
            options: { x: 93, y: 648 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence5',
            options: { x: 93, y: 630 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence6',
            options: { x: 93, y: 613 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence7',
            options: { x: 94, y: 580 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence8',
            options: { x: 94, y: 563 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence9',
            options: { x: 94, y: 545 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence9_1',
            options: { x: 129, y: 526 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence9_2',
            options: { x: 129, y: 475 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence9_3',
            options: { x: 129, y: 371 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence9_4',
            options: { x: 129, y: 336 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
    ],
  },
  //ใบคำขอของ หนังสือรับรองคุณวุฒิ ผู้บริหารการศึกษา
  {
    pdfType: 6,
    pdfSubType: 3,
    pdfSrc: 'assets/pdf/school-qualification-approve-manager.pdf',
    input: [],
  },
  //ใบคำขอของ หนังสือรับรองคุณวุฒิ ศึกษานิเทศก์
  {
    pdfType: 6,
    pdfSubType: 4,
    pdfSrc: 'assets/pdf/school-qualification-approve-education-supervisor.pdf',
    input: [
      {
        text: [
          {
            key: 'schoolname',
            options: {
              x: 387,
              y: 634,
              size: defaultSize - 1,
              color: black,
            },
          },
          {
            key: 'day',
            options: {
              x: 370,
              y: 616,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'month',
            options: {
              x: 415,
              y: 616,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'year',
            options: {
              x: 488,
              y: 616,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolname',
            options: {
              x: 210,
              y: 570,
              size: defaultSize - 3,
              color: black,
            },
          },
          {
            key: 'bureauname',
            options: {
              x: 385,
              y: 570,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'address',
            options: {
              x: 130,
              y: 551,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'moo',
            options: {
              x: 190,
              y: 551,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'street',
            options: {
              x: 275,
              y: 551,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'road',
            options: {
              x: 405,
              y: 551,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'tumbon',
            options: {
              x: 140,
              y: 534,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'amphurname',
            options: {
              x: 275,
              y: 534,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'provincename',
            options: {
              x: 415,
              y: 534,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'zipcode',
            options: {
              x: 140,
              y: 517,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'telphone',
            options: {
              x: 375,
              y: 517,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'fax',
            options: {
              x: 140,
              y: 499,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'phone',
            options: {
              x: 420,
              y: 499,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'name',
            options: {
              x: 200,
              y: 465,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'position',
            options: {
              x: 425,
              y: 465,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'bureauname',
            options: {
              x: 125,
              y: 448,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'experienceYear',
            options: {
              x: 450,
              y: 448,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'otherPosition',
            options: {
              x: 175,
              y: 431,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'otherExperienceYear',
            options: {
              x: 310,
              y: 431,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreeName1',
            options: {
              x: 205,
              y: 379,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major1',
            options: {
              x: 385,
              y: 379,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution1',
            options: {
              x: 175,
              y: 361,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate1',
            options: {
              x: 450,
              y: 361,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreeName2',
            options: {
              x: 205,
              y: 327,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major2',
            options: {
              x: 385,
              y: 327,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution2',
            options: {
              x: 175,
              y: 310,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate2',
            options: {
              x: 450,
              y: 310,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreeName3',
            options: {
              x: 205,
              y: 275,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major3',
            options: {
              x: 385,
              y: 275,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution3',
            options: {
              x: 175,
              y: 258,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate3',
            options: {
              x: 450,
              y: 258,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'degreeName4',
            options: {
              x: 205,
              y: 223,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'major4',
            options: {
              x: 385,
              y: 223,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'institution4',
            options: {
              x: 175,
              y: 206,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'graduateDate4',
            options: {
              x: 450,
              y: 206,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'approveDegreeLevel',
            options: {
              x: 240,
              y: 176,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveDegreeName',
            options: {
              x: 410,
              y: 176,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveMajor',
            options: {
              x: 149,
              y: 159,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'approveGraduateDate',
            options: {
              x: 380,
              y: 159,
              size: defaultSize,
              color: black,
            },
          },

          {
            key: 'reasonDetail',
            options: {
              x: 305,
              y: 124,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'degree1',
            options: { x: 81, y: 410 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree2',
            options: { x: 81, y: 359 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree3',
            options: { x: 81, y: 307 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'degree4',
            options: { x: 82, y: 255 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
      {
        text: [
          {
            key: 'name',
            options: {
              x: 275,
              y: 700,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 275,
              y: 305,
              size: defaultSize,
              color: black,
            },
          },
        ],
        svg: [
          {
            key: 'evidence1',
            options: { x: 94, y: 695 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence2',
            options: { x: 94, y: 677 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence3',
            options: { x: 94, y: 659 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence4',
            options: { x: 94, y: 641 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence5',
            options: { x: 94, y: 623 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence6',
            options: { x: 94, y: 605 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence7',
            options: { x: 94, y: 571 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence8',
            options: { x: 94, y: 554 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence9',
            options: { x: 94, y: 536 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence9_1',
            options: { x: 130, y: 520 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence9_2',
            options: { x: 130, y: 485 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },

          {
            key: 'evidence9_3',
            options: { x: 130, y: 381 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
          {
            key: 'evidence9_4',
            options: { x: 130, y: 345 },
            svgPath: 'M18 7L9.42857 17L6 13',
          },
        ],
      },
    ],
  },
  //ใบอนุญาตของ หนังสือรับรองคุณวุฒิ
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
              y: 396,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'degreelevel',
            options: {
              x: 245,
              y: 396,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'degreename',
            options: {
              x: 425,
              y: 396,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 255,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'degreefrom',
            options: {
              x: 115,
              y: 377,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'careertype',
            options: {
              x: 310,
              y: 507,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'careertype',
            options: {
              x: 154,
              y: 358,
              size: defaultSize - 2,
              color: black,
            },
          },
          {
            key: 'name',
            options: {
              x: 85,
              y: 490,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'position',
            options: {
              x: 326,
              y: 489,
              size: defaultSize,
              color: black,
            },
          },
          {
            key: 'schoolname',
            options: {
              x: 85,
              y: 471,
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
