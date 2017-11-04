export default function deepPick(obj, prop, value) {
  if (typeof prop === 'string') {
    prop = prop.split('.');
  }

  if (prop.length > 1) {
    let e = prop.shift();

    deepPick(obj[e] = Object.prototype.toString.call(obj[e]) === '[object Object]' ? obj[e] : {}, prop, value);
  } else {
    obj[prop[0]] = value;
  }
}
