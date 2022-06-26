import { Base64 } from 'js-base64';
export function encode_base64(data) {
    return Base64.encode(JSON.stringify(data));
  }
  
  export function decode_base64(data) {
    return JSON.parse(Base64.decode(data));
  }
  
  export function store_data(key, data) {
    localStorage.setItem(key, encode_base64(data));
  }
  
  export function update_data(data_key, key, value) {
    var data = get_data(data_key);
    if (!data) {
      return false;
    }
    data[key] = value;
    store_data(data_key, data);
  }
  
  export function get_data(key) {
    var data = localStorage.getItem(key);
    if (data) {
      return decode_base64(data);
    }
    return false;
  }
  