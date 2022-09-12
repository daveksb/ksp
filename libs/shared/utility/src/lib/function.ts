// return Thai date format, Use in component
export function thaiDate(date: Date): string {
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// format json data
// from [null,'true',null,'true',null,null] ===> ['s2','s4']
export function formatCheckboxData(input: any[], source: any[]) {
  const result = input
    .map((v, i) => (v ? source[i].value : null))
    .filter((v) => v !== null);
  //console.log('map data = ', result);
  //return JSON.stringify(result);
  return result;
}

// replace object value from empty --> null
export function replaceEmptyWithNull(input: any) {
  for (const [key, value] of Object.entries(input)) {
    if (value === '') {
      input[key] = null;
    }
  }
  return input;
}

// parse json with Thai characters support
export function parseJson(input: any) {
  return JSON.parse(decodeURIComponent(escape(window.atob(input))));
}

export function toLowercaseProp(input: any) {
  return Object.keys(input).reduce((destination: any, key) => {
    destination[key.toLowerCase()] = input[key];
    return destination;
  }, {});
}
