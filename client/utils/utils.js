export default function deepPick(obj, prop, value) {
  console.log('deepPick#obj: ', obj);
  console.log('deepPick#prop: ', prop);
  console.log('deepPick#value: ', value);

  if (typeof prop === 'string') {
    prop = prop.split('.');
  }

  if (prop.length > 1) {
    let e = prop.shift();

    console.log('e: ', e);
    console.log('obj[e]: ', obj[e]);
    deepPick(obj[e] = Object.prototype.toString.call(obj[e]) === '[object Object]' ? obj[e] : {}, prop, value);
  } else {

    console.log('obj[prop[0]: ', obj[prop[0]]);

    obj[prop[0]] = value;
  }
}
