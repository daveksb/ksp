export function thaiDate(date: Date) {
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// map json data for expected format for osb
export function mapJsonData(input: any[], source: any[]) {
  const result = input
    .map((v, i) => (v ? source[i].value : null))
    .filter((v) => v !== null);
  //console.log('map data = ', result);
  return JSON.stringify(result);
}

// replace empty object property with null
export function replaceEmptyWithNull(input: any) {
  for (const [key, value] of Object.entries(input)) {
    if (value === '') {
      input[key] = null;
    }
  }

  return input;
}

export function parseJson(input: any) {
  return JSON.parse(decodeURIComponent(escape(window.atob(input))));
}
